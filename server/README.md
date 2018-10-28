# Auth Boilerplate Server

> API server for Auth Boilerplate implemented using NestJS.

Features:

- [x] Authentication
- [x] Registration
- [x] Email Activation
- [x] Password Recovery
- [x] Profile update
- [x] User listing

## Directory Structure:

```
/test
| /intergration					# Acceptance tests which target API and verify consistency of the responses
| /seeds						# Dummy data to set up conditions for tested use cases
| /utils						# Extracted common test procedures
/src
| /config						# Application config
| /mailer						# Module implementing background queue for email processing using NestJS microservices
| /user							# Contains everything that has to do with user records
| | /transport					# Functionality specific to HTTP layer
| | | /controllers				# Defines API endpoints
| | | /guards					# Authentication logic
| | | /serializer				# Transformation rules from entities to their API representation
| | | /validator				# Request validation logic
| | | /interceptors
| | | | transform.interceptor.ts # Transforms responses using provided Serializer
| | /data
| | | /entity					# Entity definitions
| | | /interface				# Models without persistence ability
| | | /service					# Implements application logic by interacting directly with TypeORM repositories
```


