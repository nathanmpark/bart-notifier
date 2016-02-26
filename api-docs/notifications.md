[back to ToC](/api-docs/index.md)

## /notifications

Arrival notifications.
### `GET`

List active arrival notifications.
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
<td valign="top"> Filter results by destination. </td>
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



<tr>
<td valign="top"> skip </td>
<td valign="top"> Skip the first N results. </td>
<td valign="top"> no </td>
<td valign="top"> query </td>
<td valign="top"> 
<code></code>
</td>
<td valign="top">
<pre><code>{
  "type": "integer",
  "minimum": 0
}
</code></pre>
</td>
</tr>



<tr>
<td valign="top"> limit </td>
<td valign="top"> Limit the number of results returned. </td>
<td valign="top"> no </td>
<td valign="top"> query </td>
<td valign="top"> 
<code></code>
</td>
<td valign="top">
<pre><code>{
  "type": "integer",
  "minimum": 1
}
</code></pre>
</td>
</tr>



</table>




### Response Schema

---

<pre><code>{
  "type": "array",
  "items": {
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
}
</code></pre>


### `POST`

Create a new notification.
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
<td valign="top"> Notification object </td>
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
  "required": [
    "station",
    "destination",
    "datetime",
    "delta"
  ],
  "additionalProperties": false
}
</code></pre>
</td>
</tr>



</table>




### Response Schema

---

<pre><code>{
  "type": "object"
}
</code></pre>


### `DELETE`

Cancel all active notifications.





[back to ToC](/api-docs/index.md)
