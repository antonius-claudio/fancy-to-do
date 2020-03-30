# fancy-to-do

---
## POST /todos
---
> Create new Todos

**Request Header**

```
{
    "Content-Type": "application/json"
}
```

**Request Body**

```
{
    "title": "<new title todo>",
    "description": "<new description todo>",
    "status": "<new status todo>",
    "due_date": "<new due date todo>"
}
```

**Response (201 - Created)**

```
{
    "newTodo": {
        "id": <given id by system>,
        "title": "<created title todo>",
        "description": "<created description todo>",
        "status": "<created status todo>",
        "due_date": "<created due date todo>",
        "updatedAt": "2020-03-30T10:10:36.142Z",
        "createdAt": "2020-03-30T10:10:36.142Z"
    }
}
```

**Request Body**

```
{
    "title": "",
    "description": "",
    "status": "",
    "due_date": ""
}
```

**Response (400 - Bad Request)~Validation Error**
```
{
    "errors": [
        {
            "message": "Title is required!",
            "type": "notNull Violation",
            "path": "title",
            "value": null,
            "origin": "CORE",
            "instance": {
                "id": null,
                "updatedAt": "2020-03-30T10:25:34.142Z",
                "createdAt": "2020-03-30T10:25:34.142Z"
            },
            "validatorKey": "is_null",
            "validatorName": null,
            "validatorArgs": []
        },
        {
            "message": "Description is required!",
            "type": "notNull Violation",
            "path": "description",
            "value": null,
            "origin": "CORE",
            "instance": {
                "id": null,
                "updatedAt": "2020-03-30T10:25:34.142Z",
                "createdAt": "2020-03-30T10:25:34.142Z"
            },
            "validatorKey": "is_null",
            "validatorName": null,
            "validatorArgs": []
        },
        {
            "message": "Status is required!",
            "type": "notNull Violation",
            "path": "status",
            "value": null,
            "origin": "CORE",
            "instance": {
                "id": null,
                "updatedAt": "2020-03-30T10:25:34.142Z",
                "createdAt": "2020-03-30T10:25:34.142Z"
            },
            "validatorKey": "is_null",
            "validatorName": null,
            "validatorArgs": []
        },
        {
            "message": "Due Date is required!",
            "type": "notNull Violation",
            "path": "due_date",
            "value": null,
            "origin": "CORE",
            "instance": {
                "id": null,
                "updatedAt": "2020-03-30T10:25:34.142Z",
                "createdAt": "2020-03-30T10:25:34.142Z"
            },
            "validatorKey": "is_null",
            "validatorName": null,
            "validatorArgs": []
        }
    ],
    "message": "Invalid user input, error while writing to database!"
}
```

**Response (500 - Internal Server Error)~Failed Save to Database**

```
{
    "errors": {
        "name": "SequelizeDatabaseError",
        "parent": {
            "name": "error",
            "length": 104,
            "severity": "ERROR",
            "code": "42P01",
            "position": "13",
            "file": "parse_relation.c",
            "line": "1180",
            "routine": "parserOpenTable",
            "sql": "INSERT INTO \"Todos\" (\"id\",\"title\",\"description\",\"status\",\"due_date\",\"createdAt\",\"updatedAt\") VALUES (DEFAULT,$1,$2,$3,$4,$5,$6) RETURNING **;",
            "parameters": [
                "title",
                "description",
                "status",
                "2000-02-19",
                "2020-03-30 10:31:27.861 +00:00",
                "2020-03-30 10:31:27.861 +00:00"
            ]
        },
        "original": {
            "name": "error",
            "length": 104,
            "severity": "ERROR",
            "code": "42P01",
            "position": "13",
            "file": "parse_relation.c",
            "line": "1180",
            "routine": "parserOpenTable",
            "sql": "INSERT INTO \"Todos\" (\"id\",\"title\",\"description\",\"status\",\"due_date\",\"createdAt\",\"updatedAt\") VALUES (DEFAULT,$1,$2,$3,$4,$5,$6) RETURNING **;",
            "parameters": [
                "title",
                "description",
                "status",
                "2000-02-19",
                "2020-03-30 10:31:27.861 +00:00",
                "2020-03-30 10:31:27.861 +00:00"
            ]
        },
        "sql": "INSERT INTO \"Todos\" (\"id\",\"title\",\"description\",\"status\",\"due_date\",\"createdAt\",\"updatedAt\") VALUES (DEFAULT,$1,$2,$3,$4,$5,$6) RETURNING **;",
        "parameters": [
            "title",
            "description",
            "status",
            "2000-02-19",
            "2020-03-30 10:31:27.861 +00:00",
            "2020-03-30 10:31:27.861 +00:00"
        ]
    },
    "message": "Error while writing to database!"
}
```
---
## GET /todos
---
> Get all Todos

**Request Header**

```
{
    "Content-Type": "application/json"
}
```

**Response (200 - Ok)**

```
{
    "todos": [
        {
            "id": 1,
            "title": "title",
            "description": "description",
            "status": "status",
            "due_date": "2000-02-19",
            "createdAt": "2020-03-30T10:46:56.797Z",
            "updatedAt": "2020-03-30T10:46:56.797Z"
        },
        {
            "id": 2,
            "title": "title2",
            "description": "description2",
            "status": "status2",
            "due_date": "2000-02-19",
            "createdAt": "2020-03-30T10:47:08.463Z",
            "updatedAt": "2020-03-30T10:47:08.463Z"
        }
    ]
}
```

**Response (500 - Internal Server Error)~Failed Read to Database**

```
{
    "errors": {
        "name": "SequelizeDatabaseError",
        "parent": {
            "name": "error",
            "length": 104,
            "severity": "ERROR",
            "code": "42P01",
            "position": "90",
            "file": "parse_relation.c",
            "line": "1180",
            "routine": "parserOpenTable",
            "sql": "SELECT \"id\", \"title\", \"description\", \"status\", \"due_date\", \"createdAt\", \"updatedAt\" FROM \"Todos\" AS \"Todo\";"
        },
        "original": {
            "name": "error",
            "length": 104,
            "severity": "ERROR",
            "code": "42P01",
            "position": "90",
            "file": "parse_relation.c",
            "line": "1180",
            "routine": "parserOpenTable",
            "sql": "SELECT \"id\", \"title\", \"description\", \"status\", \"due_date\", \"createdAt\", \"updatedAt\" FROM \"Todos\" AS \"Todo\";"
        },
        "sql": "SELECT \"id\", \"title\", \"description\", \"status\", \"due_date\", \"createdAt\", \"updatedAt\" FROM \"Todos\" AS \"Todo\";"
    },
    "message": "Error while reading to database!"
}
```
---
## GET /todos/:id
---
> Get Todo by Id

**Request Header**

```
{
    "Content-Type": "application/json"
}
```

**Request Params**
```
/todos/<ID>
```
**Request Body**
```
no needed
```

**Response (200 - Ok)**
```
{
    "todo": {
        "id": 2,
        "title": "title2",
        "description": "description2",
        "status": "status2",
        "due_date": "2000-02-19",
        "createdAt": "2020-03-30T10:47:08.463Z",
        "updatedAt": "2020-03-30T10:47:08.463Z"
    }
}
```
**Response (404 - Not Found)**
```
{
    "errors": "Not Found!"
}
```
**Response (500 - Internal Server Error)~Failed Read to Database**

```
{
    "errors": {
        "name": "SequelizeDatabaseError",
        "parent": {
            "name": "error",
            "length": 104,
            "severity": "ERROR",
            "code": "42P01",
            "position": "90",
            "file": "parse_relation.c",
            "line": "1180",
            "routine": "parserOpenTable",
            "sql": "SELECT \"id\", \"title\", \"description\", \"status\", \"due_date\", \"createdAt\", \"updatedAt\" FROM \"Todos\" AS \"Todo\" WHERE \"Todo\".\"id\" = '3';"
        },
        "original": {
            "name": "error",
            "length": 104,
            "severity": "ERROR",
            "code": "42P01",
            "position": "90",
            "file": "parse_relation.c",
            "line": "1180",
            "routine": "parserOpenTable",
            "sql": "SELECT \"id\", \"title\", \"description\", \"status\", \"due_date\", \"createdAt\", \"updatedAt\" FROM \"Todos\" AS \"Todo\" WHERE \"Todo\".\"id\" = '3';"
        },
        "sql": "SELECT \"id\", \"title\", \"description\", \"status\", \"due_date\", \"createdAt\", \"updatedAt\" FROM \"Todos\" AS \"Todo\" WHERE \"Todo\".\"id\" = '3';"
    },
    "message": "Error while reading to database!"
}
```
---
## PUT /todos/:id
---
> Update Todo by Id

**Request Header**

```
{
    "Content-Type": "application/json"
}
```

**Request Params**
```
/todos/<ID>
```
**Request Body**
```
{
    "title": "<update title todo>",
    "description": "<update description todo>",
    "status": "<update status todo>",
    "due_date": "<update due date todo>"
}
```
**Response (200 - Ok)**
```
{
    "updateTodo": {
        "title": "<updated title>",
        "description": "<updated description>",
        "status": "<updated status>",
        "due_date": "<updated due date>"
    }
}
```
**Response (404 - Not Found)**
```
{
    "errors": "ID is not registered!"
}
```

**Request Body**

```
{
    "title": "",
    "description": "",
    "status": "",
    "due_date": ""
}
```
**Response (400 - Bad Request)~Validation Error**
```
{
    "errors": [
        {
            "message": "Title is required!",
            "type": "Validation error",
            "path": "title",
            "value": "",
            "origin": "FUNCTION",
            "instance": {
                "id": null,
                "title": "",
                "description": "",
                "status": "",
                "due_date": "",
                "updatedAt": "2020-03-30T11:21:37.133Z"
            },
            "validatorKey": "notEmpty",
            "validatorName": "notEmpty",
            "validatorArgs": [
                {
                    "msg": "Title is required!"
                }
            ],
            "original": {
                "validatorName": "notEmpty",
                "validatorArgs": [
                    {
                        "msg": "Title is required!"
                    }
                ]
            }
        },
        {
            "message": "Description is required!",
            "type": "Validation error",
            "path": "description",
            "value": "",
            "origin": "FUNCTION",
            "instance": {
                "id": null,
                "title": "",
                "description": "",
                "status": "",
                "due_date": "",
                "updatedAt": "2020-03-30T11:21:37.133Z"
            },
            "validatorKey": "notEmpty",
            "validatorName": "notEmpty",
            "validatorArgs": [
                {
                    "msg": "Description is required!"
                }
            ],
            "original": {
                "validatorName": "notEmpty",
                "validatorArgs": [
                    {
                        "msg": "Description is required!"
                    }
                ]
            }
        },
        {
            "message": "Status is required!",
            "type": "Validation error",
            "path": "status",
            "value": "",
            "origin": "FUNCTION",
            "instance": {
                "id": null,
                "title": "",
                "description": "",
                "status": "",
                "due_date": "",
                "updatedAt": "2020-03-30T11:21:37.133Z"
            },
            "validatorKey": "notEmpty",
            "validatorName": "notEmpty",
            "validatorArgs": [
                {
                    "msg": "Status is required!"
                }
            ],
            "original": {
                "validatorName": "notEmpty",
                "validatorArgs": [
                    {
                        "msg": "Status is required!"
                    }
                ]
            }
        },
        {
            "message": "Due Date is required!",
            "type": "Validation error",
            "path": "due_date",
            "value": "",
            "origin": "FUNCTION",
            "instance": {
                "id": null,
                "title": "",
                "description": "",
                "status": "",
                "due_date": "",
                "updatedAt": "2020-03-30T11:21:37.133Z"
            },
            "validatorKey": "notEmpty",
            "validatorName": "notEmpty",
            "validatorArgs": [
                {
                    "msg": "Due Date is required!"
                }
            ],
            "original": {
                "validatorName": "notEmpty",
                "validatorArgs": [
                    {
                        "msg": "Due Date is required!"
                    }
                ]
            }
        },
        {
            "message": "Due Date is date!",
            "type": "Validation error",
            "path": "due_date",
            "value": "",
            "origin": "FUNCTION",
            "instance": {
                "id": null,
                "title": "",
                "description": "",
                "status": "",
                "due_date": "",
                "updatedAt": "2020-03-30T11:21:37.133Z"
            },
            "validatorKey": "isDate",
            "validatorName": "isDate",
            "validatorArgs": [
                {
                    "msg": "Due Date is date!"
                }
            ],
            "original": {
                "validatorName": "isDate",
                "validatorArgs": [
                    {
                        "msg": "Due Date is date!"
                    }
                ]
            }
        }
    ]
}
```

**Response (500 - Internal Server Error)~Failed Update to Database**

```
{
    "errors": {
        "name": "SequelizeDatabaseError",
        "parent": {
            "name": "error",
            "length": 103,
            "severity": "ERROR",
            "code": "42P01",
            "position": "8",
            "file": "parse_relation.c",
            "line": "1180",
            "routine": "parserOpenTable",
            "sql": "UPDATE \"Todos\" SET \"title\"=$1,\"description\"=$2,\"status\"=$3,\"due_date\"=$4,\"updatedAt\"=$5 WHERE \"id\" = $6",
            "parameters": [
                "title",
                "description",
                "status",
                "2000-02-19",
                "2020-03-30 10:42:36.691 +00:00",
                "3"
            ]
        },
        "original": {
            "name": "error",
            "length": 103,
            "severity": "ERROR",
            "code": "42P01",
            "position": "8",
            "file": "parse_relation.c",
            "line": "1180",
            "routine": "parserOpenTable",
            "sql": "UPDATE \"Todos\" SET \"title\"=$1,\"description\"=$2,\"status\"=$3,\"due_date\"=$4,\"updatedAt\"=$5 WHERE \"id\" = $6",
            "parameters": [
                "title",
                "description",
                "status",
                "2000-02-19",
                "2020-03-30 10:42:36.691 +00:00",
                "3"
            ]
        },
        "sql": "UPDATE \"Todos\" SET \"title\"=$1,\"description\"=$2,\"status\"=$3,\"due_date\"=$4,\"updatedAt\"=$5 WHERE \"id\" = $6",
        "parameters": [
            "title",
            "description",
            "status",
            "2000-02-19",
            "2020-03-30 10:42:36.691 +00:00",
            "3"
        ]
    },
    "message": "Error while update to database!"
}
```
-----------
## DELETE /todos/:id
----
> Delete Todo by Id

**Request Header**

```
{
    "Content-Type": "application/json"
}
```

**Request Params**
```
/todos/<ID>
```
**Request Body**
```
no needed
```
**Response (200 - Ok)**
```
{
    "deletedTodo": {
        "id": 5,
        "title": "title2",
        "description": "description2",
        "status": "status2",
        "due_date": "2000-12-02",
        "createdAt": "2020-03-30T10:58:22.888Z",
        "updatedAt": "2020-03-30T11:15:44.422Z"
    }
}
```
**Response (404 - Not Found)**
```
{
    "errors": "Not Found!"
}
```

**Response (500 - Internal Server Error)~Failed Read to Database**

```
{
    "errors": {
        "name": "SequelizeDatabaseError",
        "parent": {
            "name": "error",
            "length": 104,
            "severity": "ERROR",
            "code": "42P01",
            "position": "90",
            "file": "parse_relation.c",
            "line": "1180",
            "routine": "parserOpenTable",
            "sql": "SELECT \"id\", \"title\", \"description\", \"status\", \"due_date\", \"createdAt\", \"updatedAt\" FROM \"Todos\" AS \"Todo\" WHERE \"Todo\".\"id\" = '3';"
        },
        "original": {
            "name": "error",
            "length": 104,
            "severity": "ERROR",
            "code": "42P01",
            "position": "90",
            "file": "parse_relation.c",
            "line": "1180",
            "routine": "parserOpenTable",
            "sql": "SELECT \"id\", \"title\", \"description\", \"status\", \"due_date\", \"createdAt\", \"updatedAt\" FROM \"Todos\" AS \"Todo\" WHERE \"Todo\".\"id\" = '3';"
        },
        "sql": "SELECT \"id\", \"title\", \"description\", \"status\", \"due_date\", \"createdAt\", \"updatedAt\" FROM \"Todos\" AS \"Todo\" WHERE \"Todo\".\"id\" = '3';"
    },
    "message": "Error while delete at database!"
}
```