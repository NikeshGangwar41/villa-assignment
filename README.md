# W3Villa-assignment

---

# Data Structures Used

## 1. Arrays

Arrays are used extensively for storing collections of objects.

### Resources Array

Used in `ResourceBookingSystem` to store all resources.

```js
this.resources = [];
```

### Services Array

Used in `Resource` to store available services.

```js
this.services = services;
```

### Usage Sessions Array

Used to maintain all user sessions.

```js
this.usageSessions = [];
```

---

## 2. Objects

Objects are used for representing structured entities.

### Service Object

```js
{
  type,
  firstHourCost,
  additionalHourCost
}
```

### Session Object

```js
{
  userId,
  serviceType,
  startTime,
  endTime
}
```

### Billing Object

```js
{
  userId,
  resourceName,
  totalCost,
  billingHours
}
```

---

# Logic and Approach

## 1. Resource Management

Each resource has:

- A maximum capacity
- Current active users count
- Supported services
- Usage session history

Before starting a session, the system checks:

```js
currentUsers < capacity
```

If capacity is full, the request is rejected.

---

## 2. Session Tracking

When a user starts usage:

- A new session object is created
- Start time is recorded using `new Date()`
- Session is stored in `usageSessions`
- Active user count increases

```js
const session = {
  userId,
  serviceType,
  startTime: new Date(),
  endTime: null
};
```

When usage ends:

- The matching active session is found
- End time is recorded
- Billing is calculated
- Active user count decreases

---

## 3. Billing Logic

Billing follows hourly pricing rules.

### Steps

1. Calculate total duration:

```js
const durationMs = session.endTime - session.startTime;
```

2. Convert to hours:

```js
const durationHours = durationMs / (1000 * 60 * 60);
```

3. Round up hours:

```js
const billingHours = Math.ceil(durationHours);
```

4. Apply pricing:

- First hour uses `firstHourCost`
- Remaining hours use `additionalHourCost`

---

## 4. Searching Logic

The system uses array helper methods:

### `find()`

Used for retrieving resources/services.

```js
this.resources.find((r) => r.name === name);
```

### `findIndex()`

Used for locating active sessions.

```js
this.usageSessions.findIndex(
  (s) => s.userId === userId && s.endTime === null
);
```

---

# Project Structure

```bash
.
├── Service.js
├── Resource.js
├── ResourceBookingSystem.js
├── main.js
└── README.md
```

---

# How to Run

Execute:

```bash
node main.js
```

---

# Complexity Analysis

| Operation | Time Complexity |
|---|---|
| Add Resource | O(1) |
| Find Resource | O(n) |
| Start Usage | O(1) |
| Stop Usage | O(n) |
| Calculate Bill | O(n) |

