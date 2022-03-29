// storage ctrl
const storageCtrl = (function(){
return{
    storeItem: function(item){
        let items
        if(localStorage.getItem('items')=== null){
            items = [];
            items.push(item);
            localStorage.setItem('items',JSON.stringify(items))
        }else{
            items = JSON.parse(localStorage.getItem('items'));
            items.push(item);
            localStorage.setItem('items',JSON.stringify(items));
        }
    },
    getItemFromLS: function(){
        let items
        if(localStorage.getItem('items')=== null){
            items = [];
        } else{
            items = JSON.parse(localStorage.getItem('items'));
        }
        return items;
    },
    updateItemStorage : function(updatedItem){
        let items = JSON.parse(localStorage.getItem('items'));
        items.forEach(function(item,index){
            if(updatedItem.id === item.id){
                items.splice(index , 1 ,updatedItem)
            }
        })
          localStorage.setItem('items',JSON.stringify(items))
    },
    deleteFromLocalStorage : function(id){
        let items = JSON.parse(localStorage.getItem('items'));
        items.forEach(function(item,index){
            if(id === item.id){
                items.splice(index , 1)
            }
        })
          localStorage.setItem('items',JSON.stringify(items))
    },
    clearItemFromStorage: function(){
        localStorage.removeItem('items');
    }
}
})();

//item controler
const itemCtrl = (function(){
    const Item = function(id,name,calories){
        this.id = id;
        this.name = name;
        this.calories = calories;
    }

    const data = {
        items : storageCtrl.getItemFromLS(),
        currentItem : null,
        totalCalories: 0
    }

    return {
        getItems : function(){
            return data.items
        },
        addItem : function(name,calories){
            if(data.items.length > 0){
                 id = data.items.length;
            }else{
                id=0;
            }
            calories = parseInt(calories);
            newItem = new Item(id,name,calories);
            data.items.push(newItem);
            return newItem;
        },
        logdata : function(){
            return data;
        },
        getTotalCalories : function(){
            let total = 0 ;
           for(let i = 0 ; i<data.items.length ; i++){
            console.log(data.items.length);
               total = total + parseInt(data.items[i].calories);
               console.log(total);
           }
            data.totalCalories = total;
            return data.totalCalories;
        },
        getItemById: function(id){
            let result = null;
            data.items.forEach(function(item){
                if(id === item.id){
                    result = item
                }
            });
            return result;
        },
        setCurrentItem: function(item){
            data.currentItem = item;
        },
        getCurrentItem: function(){
            
            return data.currentItem;
        },
        updatItem: function(name, calories){
           calories = parseInt(calories);
            let found = null;
            data.items.forEach(function(item){
                if(item.id === data.currentItem.id){
                    item.name = name;
                    item.calories = calories; 
                    found = item;
                }
            });
            return found;
        },
        deletItem: function(id){
            ids= data.items.map(function(item){
                return item.id;
            });
            const index = ids.indexOf(id);
            data.items.splice(index,1)
        },
        deletAllItem: function(){
            data.items =[];
            console.log('run item');
        }
    }
})();

//Ui controler

const uictrl = (function(){
    const uiselectors = {
        itemlist :'item-list',
        listitems : '#item-list li',
        itemname :'item-name',
        itemcalories :'item-calorie',
        addbtn: '.add-btn',
        update_btn : '.update-btn',
        delete_btn: '.delete-btn',
        back_btn: '.back-btn',
        tital_calories :'.tital-calories',
        clearAll: '.clear-btn'
    }

   return{
       addItemToList : function(items){
           let html = '';
           items.forEach(item => {
            html +=`<li class="collection-item" id="item-${item.id}">
            <strong>${item.name} :</strong> <em>${item.calories} Calories</em>
            <a herf="#" class="secondary-content"><i class="edit-item fa fa-pencil"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="16 3 21 8 8 21 3 21 3 16 16 3"></polygon></svg></i>
            </a>
            </li>`
           });
           document.getElementById(uiselectors.itemlist).innerHTML = html;
       },
       getInput : function(){
           return{
           name:document.getElementById(uiselectors.itemname).value,
           calories:document.getElementById(uiselectors.itemcalories).value
        }
       },
       addItemToUI: function(item){
        document.getElementById(uiselectors.itemlist).style.display='block';
        let li = document.createElement('li');
        li.className = 'collection-item';
        li.id =`item-${item.id}`;
        li.innerHTML = `<strong>${item.name} :</strong> <em>${item.calories} Calories</em>
        <a herf="#" class="secondary-content"><i class="edit-item"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="16 3 21 8 8 21 3 21 3 16 16 3"></polygon></svg></i>
        </a>`;
        document.getElementById(uiselectors.itemlist).insertAdjacentElement('beforeend',li);
       },
       getselectors : function(){
         return uiselectors;
        },
        clearInput : function(){
            document.getElementById(uiselectors.itemname).value='',
           document.getElementById(uiselectors.itemcalories).value=''
        },
        hidelist : function(){
            document.getElementById(uiselectors.itemlist).style.display='none';
        },
       showTotalCalories: function(totalCalories){
        document.querySelector(uiselectors.tital_calories).textContent = totalCalories;
       },
       updateListItem: function(item){
        let listItems = document.querySelectorAll(uiselectors.listitems);
        listItems = Array.from(listItems);

        listItems.forEach(function(listItem){
            const itemID = listItem.getAttribute('id');
       
            if(itemID ===`item-${item.id}`){
                document.querySelector(`#${itemID}`).innerHTML = `<strong>${item.name} :</strong> <em>${item.calories} Calories</em>
                <a herf="#" class="secondary-content"><i class="edit-item fa fa-pencil"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="16 3 21 8 8 21 3 21 3 16 16 3"></polygon></svg></i>
                </a>`;
            }
            const totalCalories = parseInt(itemCtrl.getTotalCalories());
            uictrl.showTotalCalories(totalCalories);
            uictrl.clearInput();
            uictrl.clearEditState();
        });
       },
       clearEditState: function(){
        uictrl.clearInput();
        document.querySelector(uiselectors.update_btn).style.display='none';
        document.querySelector(uiselectors.delete_btn).style.display='none';
        document.querySelector(uiselectors.back_btn).style.display='none';
        document.querySelector(uiselectors.addbtn).style.display='inline';
           
       },
       showEditstate: function(){
        document.querySelector(uiselectors.update_btn).style.display='inline';
        document.querySelector(uiselectors.delete_btn).style.display='inline';
        document.querySelector(uiselectors.back_btn).style.display='inline';
        document.querySelector(uiselectors.addbtn).style.display='none';
       },
       addCurrentItem: function(){
       document.getElementById(uiselectors.itemname).value= itemCtrl.getCurrentItem().name;
        document.getElementById(uiselectors.itemcalories).value = itemCtrl.getCurrentItem().calories;
       },
       deletListItem: function(id){
        const itemId = `item-${id}`;
        const item = document.getElementById(itemId);
        item.remove();
        this.clearInput();
        const totalCalories = parseInt(itemCtrl.getTotalCalories());
        uictrl.showTotalCalories(totalCalories);
        this.clearEditState();
       },
       removeAllItems: function(){
           const listItem = document.querySelectorAll(uiselectors.listitems);
           let listItems = Array.from(listItem);
           listItems.forEach(function(item){
               item.remove();
           })
           this.hidelist();
       }
   }

})();

// app controler 

const App = (function(itemCtrl,storageCtrl,uictrl){
   
    const loadeventListeners = function(){
        const uiselectors = uictrl.getselectors();
        document.querySelector(uiselectors.addbtn).addEventListener('click',itemAddsubmit);
        document.addEventListener('keypress',function(e){
                if(e.keycode === 13 || e.which === 13){
                    e.preventDefault();
                    return false;
                }
        });
        document.getElementById(uiselectors.itemlist).addEventListener('click',itemEditClick);
        document.querySelector(uiselectors.update_btn).addEventListener('click',itemUpdateSubmit);
        document.querySelector(uiselectors.delete_btn).addEventListener('click',itemDeletSubmit);
        document.querySelector(uiselectors.back_btn).addEventListener('click',clearit);
        document.querySelector(uiselectors.clearAll).addEventListener('click',clearAll);
    }
    const itemAddsubmit = function(e){
        const input = uictrl.getInput();
    
        if(input.name !=='' && input.calories !==''){
            const newItem = itemCtrl.addItem(input.name , input.calories);
            storageCtrl.storeItem(newItem);
            uictrl.addItemToUI(newItem);
            const totalCalories = parseInt(itemCtrl.getTotalCalories());
            uictrl.showTotalCalories(totalCalories);
            uictrl.clearInput();
        }
       
       e.preventDefault();
    }
    const itemUpdateSubmit = function(e){
        const input = uictrl.getInput();
       const updatedItem = itemCtrl.updatItem(input.name,input.calories);
       uictrl.updateListItem(updatedItem);
       storageCtrl.updateItemStorage(updatedItem);
        e.preventDefault();
    }
    const itemDeletSubmit = function(e){
      const currentItem = itemCtrl.getCurrentItem();
      itemCtrl.deletItem(currentItem.id);
       uictrl.deletListItem(currentItem.id);
       storageCtrl.deleteFromLocalStorage(currentItem.id);

        e.preventDefault();
    }
    const clearit = function(e){
        uictrl.clearInput();
        document.querySelector('.update-btn').style.display = 'none';
        document.querySelector('.delete-btn').style.display='none';
        document.querySelector('.back-btn').style.display='none';
        document.querySelector('.add-btn').style.display='inline';
        e.preventDefault();
    }
    
    const itemEditClick = function(e){
          if(e.target.parentNode.classList.contains('edit-item')){
               const listId = e.target.parentNode.parentNode.parentNode.id;
               const listIdArr = listId.split('-');
               const id = parseInt(listIdArr[1]);
               const itemToEdit = itemCtrl.getItemById(id);
               itemCtrl.setCurrentItem(itemToEdit);
               uictrl.addCurrentItem();
               uictrl.showEditstate();
          }
    }

    const clearAll = function(e){
        uictrl.clearEditState();
        itemCtrl.deletAllItem();
        uictrl.removeAllItems();
        storageCtrl.clearItemFromStorage();
        const totalCalories = itemCtrl.getTotalCalories();
           uictrl.showTotalCalories(totalCalories)
        e.preventDefault();
    }
   return {
       init : function(){
           uictrl.clearEditState();
           const items = itemCtrl.getItems();
           if(items.length === 0){
               uictrl.hidelist();
           }else{
            uictrl.addItemToList(items);
           }
           
           loadeventListeners();
           const totalCalories = itemCtrl.getTotalCalories();
           uictrl.showTotalCalories(totalCalories)
       }
   }
})(itemCtrl,storageCtrl,uictrl);

App.init();

