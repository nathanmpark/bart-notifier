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
<th> status code </th>
<th> description </th>
<th> headers </th>
<th> schema </th>
</tr>
<tr>
<td>
200
</td>
<td>
Returns an array of objects. Each object has an _id and possible additional properties.
</td>
<td>
<pre>null
</pre>
</td>
<td>
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
</td>
</tr>
<tr>
<td>
400
</td>
<td>
Request is malformed (i.e. invalid parameters).
</td>
<td>
<pre>null
</pre>
</td>
<td>
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
</td>
</tr>
<tr>
<td>
403
</td>
<td>
User is not authorized to run this operation.
</td>
<td>
<pre>null
</pre>
</td>
<td>
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
</td>
</tr>
<tr>
<td>
500
</td>
<td>
There was an unexpected internal error processing this request.
</td>
<td>
<pre>null
</pre>
</td>
<td>
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
</td>
</tr>
</table>

[back to ToC](/api-docs/index.md)
