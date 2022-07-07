
# Project Title

Backend for a task manager application using NodeJs, Express and MongoDB. The API was tested using postman.
![image](https://user-images.githubusercontent.com/77148000/173841229-c7d6f672-225a-4637-82bc-a781457091e9.png)

## API Reference

#### Register

```js
  POST /api/users/register
```

#### Login

```js
  POST /api/users/login
```

### You must be logged in manage your tasks

#### Create One Task

```js
  POST /api/tasks/createOne
```

#### Get All Tasks

```js
  GET /api/tasks/getAll
```
#### Update

```js
  PATCH /api/tasks/${id}
```

#### Delete

```js
  DELETE /api/users/${id}
```
