[back to ToC](/api-docs/index.md)

## /stations/:_id


### `GET`

Find an object in this Collection by _id.
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
<td valign="top"> _id </td>
<td valign="top"> Object _id </td>
<td valign="top"> yes </td>
<td valign="top"> path </td>
<td valign="top"> 
<code>null</code>
</td>
<td valign="top">
<code>null</code></td>
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
Returns the object resource found at this URL specified by id.
</td>
<td>
<pre>""
</pre>
</td>
<td>
<pre><code>{
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
<pre>""
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
<pre>""
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
404
</td>
<td>
Collection resource cannot be found by the supplied _id.
</td>
<td>
<pre>""
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
<pre>""
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
