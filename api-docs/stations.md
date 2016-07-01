[back to ToC](/api-docs/index.md)

## /stations

get station information
### `GET`

Find objects in this Collection.
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
<code>null</code>
</td>
<td valign="top">
<pre><code>{
  "type": "object"
}
</code></pre>
</td>
</tr>



<tr>
<td valign="top"> view </td>
<td valign="top"> View </td>
<td valign="top"> no </td>
<td valign="top"> query </td>
<td valign="top"> 
<code>null</code>
</td>
<td valign="top">
<pre><code>{
  "type": "string"
}
</code></pre>
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
}
</code></pre>
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
}
</code></pre>
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
}
</code></pre>
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
}
</code></pre>
</td>
</tr>



</table>


### Responses

---

<table>
<tr>
<th> name </th>
<th> description </th>
<th> headers </th>
<th> schema </th>
</tr>
<tr>

</tr>
<tr>
Returns an array of objects. Each object has an _id and possible additional properties.
</tr>
<tr>
<pre>
Returns an array of objects. Each object has an _id and possible additional properties.
</pre>
</tr>
<tr>
<pre><code>{
  "type": "array",
  "items": {
    "type": "object",
    "properties": {
      "_id": {
        "type": "string"
      }
    },
    "required": [
      "_id"
    ]
  }
}
</code></pre>
</tr>
<tr>

</tr>
<tr>
Request is malformed (i.e. invalid parameters).
</tr>
<tr>
<pre>
Request is malformed (i.e. invalid parameters).
</pre>
</tr>
<tr>
<pre><code>{
  "type": "object",
  "properties": {
    "code": {
      "type": "integer"
    },
    "description": {
      "type": "string"
    },
    "message": {
      "type": "string"
    }
  },
  "required": [
    "code",
    "description",
    "message"
  ]
}
</code></pre>
</tr>
<tr>

</tr>
<tr>
User is not authorized to run this operation.
</tr>
<tr>
<pre>
User is not authorized to run this operation.
</pre>
</tr>
<tr>
<pre><code>{
  "type": "object",
  "properties": {
    "code": {
      "type": "integer"
    },
    "description": {
      "type": "string"
    },
    "message": {
      "type": "string"
    }
  },
  "required": [
    "code",
    "description",
    "message"
  ]
}
</code></pre>
</tr>
<tr>

</tr>
<tr>
There was an unexpected internal error processing this request.
</tr>
<tr>
<pre>
There was an unexpected internal error processing this request.
</pre>
</tr>
<tr>
<pre><code>{
  "type": "object",
  "properties": {
    "code": {
      "type": "integer"
    },
    "description": {
      "type": "string"
    },
    "message": {
      "type": "string"
    }
  },
  "required": [
    "code",
    "description",
    "message"
  ]
}
</code></pre>
</tr>
</table>

[back to ToC](/api-docs/index.md)
