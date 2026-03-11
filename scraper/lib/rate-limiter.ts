export interface RateLimiterOptions {
  delayMs: number;
  maxRetries: number;
  maxConcurrency: number;
  backoffMultiplier: number;
  maxDelayMs: number;
}

const DEFAULT_OPTIONS: RateLimiterOptions = {
  delayMs: 500,
  maxRetries: 3,
  maxConcurrency: 5,
  backoffMultiplier: 2,
  maxDelayMs: 30000,
};

export class RateLimiter {
  private options: RateLimiterOptions;
  private activeRequests = 0;
  private queue: Array<() => void> = [];
  private lastRequestTime = 0;

  constructor(options: Partial<RateLimiterOptions> = {}) {
    this.options = { ...DEFAULT_OPTIONS, ...options };
  }

  private async waitForDelay(): Promise<void> {
    const now = Date.now();
    const timeSinceLastRequest = now - this.lastRequestTime;
    const waitTime = Math.max(0, this.options.delayMs - timeSinceLastRequest);
    if (waitTime > 0) {
      await this.sleep(waitTime);
    }
    this.lastRequestTime = Date.now();
  }

  private sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  private async acquireSlot(): Promise<void> {
    if (this.activeRequests >= this.options.maxConcurrency) {
      await new Promise<void>((resolve) => {
        this.queue.push(resolve);
      });
    }
    this.activeRequests++;
  }

  private releaseSlot(): void {
    this.activeRequests--;
    const next = this.queue.shift();
    if (next) {
      next();
    }
  }

  async execute<T>(
    fn: () => Promise<T>,
    context?: string
  ): Promise<{ data: T | null; error: string | null; attempts: number }> {
    await this.acquireSlot();

    let lastError: string | null = null;
    let attempts = 0;

    try {
      for (let retry = 0; retry <= this.options.maxRetries; retry++) {
        attempts++;
        await this.waitForDelay();

        try {
          const data = await fn();
          return { data, error: null, attempts };
        } catch (err) {
          lastError = err instanceof Error ? err.message : String(err);

          if (retry < this.options.maxRetries) {
            const delay = Math.min(
              this.options.delayMs * Math.pow(this.options.backoffMultiplier, retry),
              this.options.maxDelayMs
            );
            console.warn(
              `[RateLimiter] ${context || "Request"} failed (attempt ${retry + 1}/${this.options.maxRetries + 1}): ${lastError}. Retrying in ${delay}ms...`
            );
            await this.sleep(delay);
          }
        }
      }

      return { data: null, error: lastError, attempts };
    } finally {
      this.releaseSlot();
    }
  }

  async batch<T, R>(
    items: T[],
    fn: (item: T) => Promise<R>,
    onProgress?: (completed: number, total: number) => void
  ): Promise<Array<{ item: T; data: R | null; error: string | null }>> {
    const results: Array<{ item: T; data: R | null; error: string | null }> = [];
    let completed = 0;

    const processItem = async (item: T) => {
      const result = await this.execute(() => fn(item));
      results.push({ item, data: result.data, error: result.error });
      completed++;
      onProgress?.(completed, items.length);
    };

    const batches: T[][] = [];
    for (let i = 0; i < items.length; i += this.options.maxConcurrency) {
      batches.push(items.slice(i, i + this.options.maxConcurrency));
    }

    for (const batch of batches) {
      await Promise.all(batch.map(processItem));
    }

    return results;
  }
}

export const defaultRateLimiter = new RateLimiter();

export function createRateLimiter(options?: Partial<RateLimiterOptions>): RateLimiter {
  return new RateLimiter(options);
}
