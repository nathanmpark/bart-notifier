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
<th> name </th>
<th> description </th>
<th> headers </th>
<th> schema </th>
</tr>
<tr>

</tr>
<tr>
Returns the object resource found at this URL specified by id.
</tr>
<tr>
<pre>
Returns the object resource found at this URL specified by id.
</pre>
</tr>
<tr>
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
</tr>
<tr>

</tr>
<tr>
Collection resource cannot be found by the supplied _id.
</tr>
<tr>
<pre>
Collection resource cannot be found by the supplied _id.
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


[back to ToC](/api-docs/index.md)
