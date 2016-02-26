[back to ToC](/api-docs/index.md)

## /notifications/:id

Arrival notification details.
### `GET`

Retrieve a specific notification.
### Parameters

---

<table>
<tr>
<th> name </th>
<th> description </th>
<th> required </th>
<th> location </th>
<th> default </th>
<th> schema </th>
</tr>



<tr>
<td valign="top"> destination </td>
<td valign="top"> Filter by destination ID. </td>
<td valign="top"> no </td>
<td valign="top"> query </td>
<td valign="top"> 
<code>null</code>
</td>
<td valign="top">
<pre><code>{
  "type": "string",
  "pattern": "^[a-zA-Z0-9]{4}$"
}
</code></pre>
</td>
</tr>



</table>




### Response Schema

---

<pre><code>{
  "type": "object",
  "properties": {
    "id": {
      "type": "string"
    },
    "station": {
      "type": "string",
      "pattern": "^[a-zA-Z0-9]{4}$"
    },
    "destination": {
      "type": "string",
      "pattern": "^[a-zA-Z0-9]{4}$"
    },
    "datetime": {
      "type": "string"
    },
    "notified": {
      "type": "boolean"
    },
    "delta": {
      "type": "integer"
    }
  }
}
</code></pre>


### `PATCH`

Update a notification.
### Parameters

---

<table>
<tr>
<th> name </th>
<th> description </th>
<th> required </th>
<th> location </th>
<th> default </th>
<th> schema </th>
</tr>



<tr>
<td valign="top"> body </td>
<td valign="top"> Notification object. </td>
<td valign="top"> yes </td>
<td valign="top"> body </td>
<td valign="top"> 
<code>null</code>
</td>
<td valign="top">
<pre><code>{
  "type": "object",
  "properties": {
    "station": {
      "type": "string"
    },
    "destination": {
      "type": "string"
    },
    "datetime": {
      "anyOf": [
        {
          "type": "string"
        },
        {
          "type": "integer",
          "minimum": 0
        }
      ]
    },
    "delta": {
      "type": "integer",
      "minimum": 10,
      "maximum": 30
    }
  },
  "minProperties": 1,
  "additionalProperties": false
}
</code></pre>
</td>
</tr>



</table>






### `DELETE`

Cancel a specific notification.





[back to ToC](/api-docs/index.md)
