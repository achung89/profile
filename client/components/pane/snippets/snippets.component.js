angular
  .module('pane')

    .component('snippetsPane', {
      controllerAs: 'snippetsPane',
      templateUrl:'pane/snippets/snippets.html',
      controller: function ( Snippets, view ) {
        this.snippets = Snippets;
      }
    })

    .component('snippet', {
      controllerAs: 'snippet',
      template:`<div id="snippet{{snippet.index}}">
                  <br>
                  <h3 style="display:inline;" class = "snippet-description">
                    {{snippet.description}}
                  </h3>  
                  &nbsp;	&nbsp;	&nbsp;
                  <a class="snippet-link" href="{{snippet.link}}">
                    source
                  </a>
                  <br>
                  <br>
                  <code class="code-snippet">{{snippet.code}}</code>
                </div><br>`,
      controller: function ( Snippets, $attrs ) {
        this.$postLink = ()=>{
          this.index = $attrs.id;

          for ( let key in Snippets[this.index] ) {
            this[key] = Snippets[this.index][key];
          }  

        }
      }
    })

    .factory('Snippets', function() {
      
      function tag ( strings, ...values ) {
        var string = '';
        for( var i = 0; i < strings.length; i++ ) {
          if ( i > 0 ) str += values[i];
          string += strings[i].replace(/^                      /gm,'');
        }
        return string;
      }

      var snippets = {

          'xmlDocToFrag': {
            description: 'Convert xml string to documentFragment',
            link:'http://stackoverflow.com/questions/9284117/inserting-arbitrary-html-into-a-documentfragment',
            code: tag`var xmlString = "<div></div>
                                       <div>
                                         <span></span>
                                       </div>";

                      var parsedXML = document.createRange().createContextualFragment(xmlString);
                      // parsedXML.children === [<div>,<div>]`
          },

          'executingJavascriptString': {
            description: "Evaluate stringified code without 'eval'",
            link: 'http://stackoverflow.com/questions/2592092/executing-script-elements-inserted-with-innerhtml',
            code: tag`function evalScript(javascriptString) {
                        var head = document.getElementsByTagName("head")[0] ||
                                      document.documentElement,
                        script = document.createElement("script");
                        script.type = "text/javascript";
                        try {
                          // doesn't work on ie...
                        script.appendChild(document.createTextNode(javascriptString));      
                        } catch(e) {
                          script.text = data;
                        }

                        head.insertBefore(script, head.firstChild);
                        head.removeChild(script);
                      };`
          },

          'fnLineNumber': {
            description: 'Get filename and line number where function was invoked',
            link:'http://stackoverflow.com/questions/1340872/how-to-get-javascript-caller-function-line-number-how-to-get-javascript-caller',
            code: tag`function getErrorObject() {
                        try { throw Error('') } catch(err) { return err; }
                      }
                      var stack = getErrorObject().stack.split("\\n")[4];
                      var index = stack.indexOf("at ");
                      var clean = stack.slice(index+2, stack.length);`,
          },
          'deleteTemplateLiteralIndents': {
            description: 'Tag to remove template string indentation',
            code: tag`function tag ( strings, ...values ) {
                        var string = '';
                        for ( var i = 0; i < strings.length; i++ ) {
                          if ( i > 0 ) str += values[i];
                          string += strings[i].replace(/^                      /gm,'');
                        }
                        return string;
                      }`
          },
          'isNode': {
            description: 'Type-check DOM nodes and HTMLElements',
            link: 'http://stackoverflow.com/questions/384286/javascript-isdom-how-do-you-check-if-a-javascript-object-is-a-dom-object/34493745',
            code: tag`function isNode(node){
                        return (
                          typeof Node === "object" 
                          ? node instanceof Node 
                          : node && typeof node === "object" && typeof node.nodeType === "number" && typeof node.nodeName==="string"
                        );
                      }
   
                      function isElement(elem){
                        return (
                          typeof HTMLElement === "object" 
                          ? elem instanceof HTMLElement 
                          : elem && typeof elem === "object" && elem !== null && elem.nodeType === 1 && typeof elem.nodeName==="string"
                        );
                      }`,
          },
      }
      return snippets;
    })