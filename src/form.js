/**********************
FORM
**********************/
var Form =
{
   "getDefaultValue": function(elem)
   {
      var el = get(elem);
      if(el && "nodeName" in el)
      {
         var type = el.nodeName.toLowerCase();
         if(type == "input" || type == "textarea")
         {
            return el.defaultValue;
         }
         else if(type == "select")
         {
            var defaults = [];
            for(var x = 0; x < el.options.length; ++x)
            {
               var option = el.options[x];
               if(option.defaultSelected)
               {
                  defaults.push(option.value);
               }
            }
            return defaults.join(",");
         }
      }
      return null;
   },
   "fieldChanged": function(elem)
   {
      var el = get(elem);
      if(el && "nodeName" in el)
      {
         var type = el.nodeName.toLowerCase();
         if(type == "input" || type == "textarea")
         {
            if(el.defaultValue != el.value)
            {
               return true;
            }
         }
         else if(type == "select")
         {
            for(var x = 0; x < el.options.length; ++x)
            {
               var option = el.options[x];
               if(option.defaultSelected != option.selected)
               {
                  return true;
               }
            }
         }
      }
      return false;
   }
};
//Form.SelectableCollection = 
function RadioCollection(name)
{
   var self = this;
   
   this.value = null;
   this.items = [];
   this.length = 0;
   this.selectedIndex = null;
   this.__set = function(val, index)
   {
      self.value = (typeof val !== "undefined") ? val : null;
      self.selectedIndex = (typeof index !== "undefined") ? index : null;
   };

   function init()
   {
      var i = get.byName(name);
      if(i)
      {
         for(var x = 0; x < i.length; ++x)
         {
            if(i[x].type == "radio")
            {
               self.items.push(i[x]);
               if(i[x].checked)
               {
                  //index is not set to x since x is all items with this name and we are only counting about radios
                  self.__set(i[x].value, self.items.length - 1);
               }               
            }
         }
         self.length = self.items.length;
      }
   }
   init();
}
RadioCollection.prototype =
{
   uncheckAll : function()
   {
      /*for(var x = 0; x < self.items.length; ++x)
      {
         self.items[x].checked = false;
      }*/
      //should be able to just uncheck the currently selected item since the browser should not allow more than
      //one item to be checked. The loop can be re-implemented if this turns out to not work as expected
      if(this.selectedIndex != null)
      {
         this.items[this.selectedIndex].checked = false;
      }
      this.__set();
   },
   checkValue : function(value, executeOnclickFunc)
   {
      for(var x = 0; x < this.items.length; ++x)
      {
         var item = this.items[x];
         if(item.value == value)
         {
            item.checked = true;
            this.__set(value, x);
            if(executeOnclickFunc === true && typeof item.onclick == "function")
            {
               item.onclick();
            }
            //only one valid selection in a radio collection, so return
            return;
         }
      }
   },
   refresh : function()
   {
      for(var x = 0; x < this.items.length; ++x)
      {
         var item = this.items[x];
         if(item.checked)
         {
            //if the item is checked set the values accordingly
            this.__set(item.value, x);
            //there can be only one valid selection in a radio collection, so return
            return;
         }
      }
      this.__set();
   }
};

