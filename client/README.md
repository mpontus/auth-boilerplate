# Auth Boilerplate Client

> Web app for Auth Boilerplate

Features:

- [x] Authentication
- [x] Registration
- [x] Email Activation
- [x] Password Recovery
- [x] Profile update

## File Structure

Application follows flat directory structure
```
/src
| /action			# Redux action creators
| /api
| | /methods		# Individual api methods
| | /schema			# API response validators
| | /utils			# Common functionality
| | ApiGateway.ts	# Functionality shared by all API methods
| /component		# Reusable UI components
| /container		# Connected components
| /epic				# Redux async logic
| /model			# Application model definitions
| /reducer			# Redux reducers
| /screen			# Application views
| /selector			# Redux selectors
| routes.ts			# Application paths
```
