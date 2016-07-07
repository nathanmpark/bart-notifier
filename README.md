# Bart Notifier Service


An API to query up-to-date arrival times and schedule arrival notifications


<pre>

Usage: /Users/Greg/.pyenv/versions/2.7.10/envs/carbonio-dev-env/bin/node bns gen-static-docs [options]

Options:
   -v VERBOSITY, --verbosity VERBOSITY   verbosity level (trace | debug | info | warn | error | fatal)
   --flavor FLAVOR                       choose your flavor (github-flavored-markdown | api-blueprint | aglio)  [github-flavored-markdown]
   --out PATH                            path to write static docs to (directory for multiple pages (default: api-docs) and file for single page (default: README.md))
   -o OPTION, --option OPTION            set generator specific options (format is: option[:value](,option[:value])*, can be specified multiple times)
   --show-options                        show generatore specific options

generate docs for the api
</pre>

---
* <a name="stations-toc"></a> [/stations](#stations)
    * <a name="stations-get-toc"></a> [`GET`](stations-get)
* <a name="stations--_id-toc"></a> [/stations/:_id](#stations--_id)
    * <a name="stations--_id-get-toc"></a> [`GET`](stations--_id-get)
* <a name="stations--_id-destinations-toc"></a> [/stations/:_id/destinations](#stations--_id-destinations)
    * <a name="stations--_id-destinations-get-toc"></a> [`GET`](stations--_id-destinations-get)
* <a name="stations--_id-arrivals-toc"></a> [/stations/:_id/arrivals](#stations--_id-arrivals)
    * <a name="stations--_id-arrivals-get-toc"></a> [`GET`](stations--_id-arrivals-get)
* <a name="notifications-toc"></a> [/notifications](#notifications)
    * <a name="notifications-get-toc"></a> [`GET`](notifications-get)
    * <a name="notifications-post-toc"></a> [`POST`](notifications-post)
    * <a name="notifications-delete-toc"></a> [`DELETE`](notifications-delete)
* <a name="notifications--id-toc"></a> [/notifications/:id](#notifications--id)
    * <a name="notifications--id-get-toc"></a> [`GET`](notifications--id-get)
    * <a name="notifications--id-patch-toc"></a> [`PATCH`](notifications--id-patch)
    * <a name="notifications--id-delete-toc"></a> [`DELETE`](notifications--id-delete)


---


## <a name="stations"></a>/stations [[&#x2191;](#stations-toc)]

get station information
### <a name="-get"></a>`GET` --   [[&#x2191;](#-get-toc)]

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
}</code></pre>
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

## <a name="stations--_id"></a>/stations/:_id [[&#x2191;](#stations--_id-toc)]


### <a name="-get"></a>`GET` --   [[&#x2191;](#-get-toc)]

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
}</code></pre>
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
<pre>null
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
404
</td>
<td>
Collection resource cannot be found by the supplied _id.
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

## <a name="stations--_id-destinations"></a>/stations/:_id/destinations [[&#x2191;](#stations--_id-destinations-toc)]

Per station destinations.
### <a name="-get"></a>`GET` --   [[&#x2191;](#-get-toc)]

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



</table>






## <a name="stations--_id-arrivals"></a>/stations/:_id/arrivals [[&#x2191;](#stations--_id-arrivals-toc)]

Per station estimated arrival times.
### <a name="-get"></a>`GET` --   [[&#x2191;](#-get-toc)]

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
<td valign="top"> destination </td>
<td valign="top"> Filter results by destination (e.g., &quot;RICH&quot; for all Richmond bound trains) </td>
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






## <a name="notifications"></a>/notifications [[&#x2191;](#notifications-toc)]

Arrival notifications.
### <a name="-get"></a>`GET` --   [[&#x2191;](#-get-toc)]

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
}</code></pre>
</td>
</tr>


<tr>
<td valign="top"> skip </td>
<td valign="top"> Skip the first N results. </td>
<td valign="top"> no </td>
<td valign="top"> query </td>
<td valign="top">
<code>0</code>
</td>
<td valign="top">
<pre><code>{
  "type": "integer",
  "minimum": 0
}</code></pre>
</td>
</tr>


<tr>
<td valign="top"> limit </td>
<td valign="top"> Limit the number of results returned. </td>
<td valign="top"> no </td>
<td valign="top"> query </td>
<td valign="top">
<code>10</code>
</td>
<td valign="top">
<pre><code>{
  "type": "integer",
  "minimum": 1
}</code></pre>
</td>
</tr>



</table>





### <a name="-post"></a>`POST` --   [[&#x2191;](#-post-toc)]

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
}</code></pre>
</td>
</tr>



</table>





### <a name="-delete"></a>`DELETE` --   [[&#x2191;](#-delete-toc)]

Cancel all active notifications.




## <a name="notifications--id"></a>/notifications/:id [[&#x2191;](#notifications--id-toc)]

Arrival notification details.
### <a name="-get"></a>`GET` --   [[&#x2191;](#-get-toc)]

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
<td valign="top"> id </td>
<td valign="top"> id </td>
<td valign="top"> yes </td>
<td valign="top"> path </td>
<td valign="top">
<code>null</code>
</td>
<td valign="top">
<code>null</code></td>
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





### <a name="-patch"></a>`PATCH` --   [[&#x2191;](#-patch-toc)]

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
<td valign="top"> id </td>
<td valign="top"> id </td>
<td valign="top"> yes </td>
<td valign="top"> path </td>
<td valign="top">
<code>null</code>
</td>
<td valign="top">
<code>null</code></td>
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
}</code></pre>
</td>
</tr>



<tr>
<td valign="top"> bart-key </td>
<td valign="top"> test header </td>
<td valign="top"> no </td>
<td valign="top"> header </td>
<td valign="top">
<code>null</code>
</td>
<td valign="top">
<pre><code>{
  "type": "string"
}</code></pre>
</td>
</tr>



</table>





### <a name="-delete"></a>`DELETE` --   [[&#x2191;](#-delete-toc)]

Cancel a specific notification.
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
<td valign="top"> id </td>
<td valign="top"> yes </td>
<td valign="top"> path </td>
<td valign="top">
<code>null</code>
</td>
<td valign="top">
<code>null</code></td>
</tr>



</table>





