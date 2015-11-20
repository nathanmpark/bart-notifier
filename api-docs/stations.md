[back to ToC](/api-docs/index.md)

## /stations


### `GET`


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
<td valign="top"> query </td>
<td valign="top"> Query spec (JSON) </td>
<td valign="top"> no </td>
<td valign="top"> query </td>
<td valign="top"> 
<code>{}</code>
</td>
<td valign="top">
<pre><code>{
  "type": "object"
}</code></pre>
</td>
</tr>



<tr>
<td valign="top"> sort </td>
<td valign="top"> Sort spec (JSON) </td>
<td valign="top"> no </td>
<td valign="top"> query </td>
<td valign="top"> 
<code>null</code>
</td>
<td valign="top">
<pre><code>{
  "type": "object"
}</code></pre>
</td>
</tr>



<tr>
<td valign="top"> fields </td>
<td valign="top"> Fields spec (JSON) </td>
<td valign="top"> no </td>
<td valign="top"> query </td>
<td valign="top"> 
<code>null</code>
</td>
<td valign="top">
<pre><code>{
  "type": "object"
}</code></pre>
</td>
</tr>



<tr>
<td valign="top"> skip </td>
<td valign="top"> Results to skip </td>
<td valign="top"> no </td>
<td valign="top"> query </td>
<td valign="top"> 
<code>null</code>
</td>
<td valign="top">
<pre><code>{
  "type": "integer"
}</code></pre>
</td>
</tr>



<tr>
<td valign="top"> limit </td>
<td valign="top"> Results to limit </td>
<td valign="top"> no </td>
<td valign="top"> query </td>
<td valign="top"> 
<code>null</code>
</td>
<td valign="top">
<pre><code>{
  "type": "integer"
}</code></pre>
</td>
</tr>



</table>




### Response Schema

---

<pre><code>{
  "type": "array",
  "items": {}
}</code></pre>



[back to ToC](/api-docs/index.md)