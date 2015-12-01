# Bart Notifier Service


An API to query up-to-date arrival times and schedule arrival notifications

---
* <a name="stations-toc"></a> [/stations](#stations) [<a name="stations-get-toc"></a>[GET](#stations-get)]
* <a name="stations--id-toc"></a> [/stations/:id](#stations--id)
* <a name="stations--id-destinations-toc"></a> [/stations/:id/destinations](#stations--id-destinations) [<a name="stations--id-destinations-get-toc"></a>[GET](#stations--id-destinations-get)]
* <a name="stations--id-arrivals-toc"></a> [/stations/:id/arrivals](#stations--id-arrivals) [<a name="stations--id-arrivals-get-toc"></a>[GET](#stations--id-arrivals-get)]
* <a name="notifications-toc"></a> [/notifications](#notifications) [<a name="notifications-get-toc"></a>[GET](#notifications-get)] [<a name="notifications-post-toc"></a>[POST](#notifications-post)] [<a name="notifications-delete-toc"></a>[DELETE](#notifications-delete)]
* <a name="notifications--id-toc"></a> [/notifications/:id](#notifications--id) [<a name="notifications--id-get-toc"></a>[GET](#notifications--id-get)]


---


## <a name="stations"></a>/stations [[&#x2191;](#stations-toc)]


### <a name="stations-get"></a>`GET` -- /stations  [[&#x2191;](#stations-get-toc)]


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



## <a name="stations--id"></a>/stations/:id [[&#x2191;](#stations--id-toc)]



## <a name="stations--id-destinations"></a>/stations/:id/destinations [[&#x2191;](#stations--id-destinations-toc)]


### <a name="stations--id-destinations-get"></a>`GET` -- /stations/:id/destinations  [[&#x2191;](#stations--id-destinations-get-toc)]

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
<pre><code>{}</code></pre>
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
}</code></pre>



## <a name="stations--id-arrivals"></a>/stations/:id/arrivals [[&#x2191;](#stations--id-arrivals-toc)]


### <a name="stations--id-arrivals-get"></a>`GET` -- /stations/:id/arrivals  [[&#x2191;](#stations--id-arrivals-get-toc)]

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



## <a name="notifications"></a>/notifications [[&#x2191;](#notifications-toc)]


### <a name="notifications-get"></a>`GET` -- /notifications  [[&#x2191;](#notifications-get-toc)]

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
<code></code>
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
<code></code>
</td>
<td valign="top">
<pre><code>{
  "type": "integer",
  "minimum": 1
}</code></pre>
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
}</code></pre>


### <a name="notifications-post"></a>`POST` -- /notifications  [[&#x2191;](#notifications-post-toc)]

create a new notification
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
<td valign="top"> body </td>
<td valign="top"> create a notification </td>
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
  }
}</code></pre>
</td>
</tr>




</table>




### Response Schema

---

<pre><code>{
  "type": "object"
}</code></pre>


### <a name="notifications-delete"></a>`DELETE` -- /notifications  [[&#x2191;](#notifications-delete-toc)]

Cancel all active notifications.
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




</table>







## <a name="notifications--id"></a>/notifications/:id [[&#x2191;](#notifications--id-toc)]


### <a name="notifications--id-get"></a>`GET` -- /notifications/:id  [[&#x2191;](#notifications--id-get-toc)]

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


