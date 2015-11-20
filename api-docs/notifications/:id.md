[back to ToC](/api-docs/index.md)

## /notifications/:id


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
<td valign="top"> :id </td>
<td valign="top"> The notification ID. </td>
<td valign="top"> yes </td>
<td valign="top"> path </td>
<td valign="top"> 
<code>null</code>
</td>
<td valign="top">
<pre><code>{
  "type": "string"
}</code></pre>
</td>
</tr>




<tr>
<td valign="top"> X-Bart-Notifier-API-Key </td>
<td valign="top"> user API key required for notification management </td>
<td valign="top"> yes </td>
<td valign="top"> query </td>
<td valign="top"> 
<code>null</code>
</td>
<td valign="top">
<pre><code>{
  "type": "string"
}</code></pre>
</td>
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
}</code></pre>
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
}</code></pre>



[back to ToC](/api-docs/index.md)
