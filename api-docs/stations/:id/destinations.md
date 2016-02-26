[back to ToC](/api-docs/index.md)

## /stations/:id/destinations

Per station destinations.
### `GET`

Retrieve a list of valid destinations for a particular station.
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
<pre><code>{}
</code></pre>
</td>
</tr>



</table>




### Response Schema

---

<pre><code>{
  "type": "array",
  "items": {
    "type": "string",
    "pattern": "^[a-zA-Z0-9]{4}$"
  },
  "additionalItems": false
}
</code></pre>



[back to ToC](/api-docs/index.md)
