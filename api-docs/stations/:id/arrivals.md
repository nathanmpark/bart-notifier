[back to ToC](/api-docs/index.md)

## /stations/:id/arrivals


### `GET`

Retrieve a list of estimated arrival times for a particular station
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
<td valign="top"> id </td>
<td valign="top"> Object _id </td>
<td valign="top"> yes </td>
<td valign="top"> path </td>
<td valign="top"> 
<code>null</code>
</td>
<td valign="top">
<pre><code>{}</code></pre>
</td>
</tr>



<tr>
<td valign="top"> :id </td>
<td valign="top"> The station id. </td>
<td valign="top"> yes </td>
<td valign="top"> path </td>
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




<tr>
<td valign="top"> destination </td>
<td valign="top"> Filter results by destination (e.g., &quot;RICH&quot; for all Richmond bound trains) </td>
<td valign="top"> yes </td>
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
    "patternProperties": {
      "^[a-zA-Z0-9]{4}$": {
        "type": "string"
      }
    }
  }
}</code></pre>



[back to ToC](/api-docs/index.md)
