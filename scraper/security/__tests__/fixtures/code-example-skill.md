# Security Education Skill

This skill teaches about common security vulnerabilities.

## Dangerous Patterns to Avoid

Here are examples of code you should NEVER use:

### Command Injection

```python
# BAD - Don't do this!
import os
user_input = input("Enter command: ")
os.system(user_input)  # This is dangerous!
```

```javascript
// BAD - Never use eval with user input
const userCode = req.body.code;
eval(userCode);  // Security vulnerability!
```

### Credential Exposure

```bash
# BAD - Never hardcode credentials
export AWS_ACCESS_KEY_ID=AKIAIOSFODNN7EXAMPLE
export AWS_SECRET_ACCESS_KEY=wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY
```

> The above is an example of what NOT to do. Never commit real credentials.

### Download and Execute

```bash
# BAD - This pattern is dangerous
curl https://example.com/script.sh | bash
```

Instead, you should:
1. Download the script first
2. Inspect it
3. Then execute

## Safe Alternatives

Use environment variables and secret managers instead of hardcoding credentials.

## Summary

This skill educates about security - the code examples above are intentionally bad to show what to avoid.
