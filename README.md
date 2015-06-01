# wp_menu
this is a jquery ui plugin, used for presenting menu.

## Installation
Depends: jquery.ui.core.js jquery.ui.widget.js

## Usage
such as:
```
$(function(){
	$('a.listing_item_proc').wp_menu({
	bindings:{
		'开始服务':function(id){
			event.stopPropagation();
			event.preventDefault();
			var r=confirm('确定开始服务？');
			if (r==true)
			{
				ajaxProcess('/car_bill_items/'+id+'/start_service', 'get', function(){
					ajaxMainCentent('/work_spaces/list_items');
				});
			}
			else
			{

			}
		},
		'更换工位':function(id){
			$(document).data('listing_change_space',id);
			ajaxUpdateSelect('car_bill_items', id, 'available_spaces', {}, 'val_space');
			$('#space-check').dialog('open');
		},
		'取消':function(id){
			var r=confirm('确定要取消此项目吗？');
			  if (r==true)
			    {
					ajaxProcess('/car_bill_items/'+id+'/cancel', 'PUT', function(){
						ajaxMainCentent('/work_spaces/list_items');
					});
			    }
			  else
			    {
				
			    }
		},
		'查看项目':function(id){
			wp_tabs.wp_tag('add',{title:'查看项目', href:'/car_bill_items/'+id});
		},
		'打印派工单':function(id){
			wp_tabs.wp_tag('add',{title:'打印派工单', href:'/car_bill_items/'+id+'/print'});
		}
	},
	onShowfn:function(event,data){
		
	}
	});
});
```
click the element a.listing_item_proc present a menu having some items.



