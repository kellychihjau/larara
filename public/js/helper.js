console.log("in js");
$(function(){
    //---- side menu
    $('#aside-menu').metisMenu();

    // --- MEAL PLAN ----
    $(".meat-select").selectpicker().on('loaded.bs.select', addIconToSelect(".meat-select", "")).on('changed.bs.select', function (e, clickedIndex, isSelected, previousValue){
    	addIconToSelect (".meat-select", this.value);
    }); 
    $(".vegetable-select").selectpicker().on('loaded.bs.select', addIconToSelect(".vegetable-select", "")).on('changed.bs.select', function (e, clickedIndex, isSelected, previousValue){
    	addIconToSelect (".vegetable-select", this.value);
    }); 
    $(".protein-select").selectpicker().on('loaded.bs.select', addIconToSelect(".protein-select", "")).on('changed.bs.select', function (e, clickedIndex, isSelected, previousValue){
    	addIconToSelect (".protein-select", this.value);
    }); 

    function addIconToSelect (className, val){
    	var icon = "";
    	var title = "";
    	if (className == ".meat-select"){
    		icon = "<i class='fas fa-piggy-bank'></i> ";
    		title = "เนื้อสัตว์";
    	}else if (className == ".vegetable-select"){
    		icon = "<i class='fas fa-carrot'></i> ";
    		title = "ผัก";
    	}else if (className == ".protein-select"){
    		icon = "<i class='fas fa-egg'></i> ";
    		title = "โปรตีน";
    	}

    	if (val == ""){
	    	var inner = $(className + " .filter-option-inner-inner");
			inner.empty();
			inner.append(icon + title);
		}else{
			var inner = $(className + " .filter-option-inner-inner");
			inner.prepend(icon);
		}
    }

    $( ".ui-sortable" ).sortable();
    console.log("end sortable");



    //------- KID PROFILE
    var input_ml = $("#milk-input-ml").on("keyup", updateMilkInput);
    var input_oz = $("#milk-input-oz").on("keyup", updateMilkInput);
    var input_box = $("#milk-input-box").on("keyup", updateMilkInput);

    function updateMilkInput(event){
        var changeId = event.target.id;
        if(changeId == "milk-input-ml"){
            var ml_val = input_ml.val();
            input_oz.val((ml_val/29.574).toFixed(2));            
            input_box.val((ml_val/180).toFixed(1));
        }else if(changeId == "milk-input-oz"){
            var oz_val = input_oz.val();
            input_ml.val((oz_val*29.574).toFixed(2));
            input_box.val((oz_val*29.574/180).toFixed(1));
        }else{
            var box_val = input_box.val();
            input_ml.val((box_val*180));
            input_oz.val((box_val*180/29.574).toFixed(2));
        }
    }


    //------- SETTING CHECKBOX
    $('.for_small_select').select2();
    // var for_small = $(".for_small");
    // var for_big = $(".for_big");
    // updateDisableCheckbox("for_small");
    // updateDisableCheckbox("for_big");
    // $("#for_small").on("change", updateDisableCheckbox);
    // $("#for_big").on("change", updateDisableCheckbox);

    // function updateDisableCheckbox(type){
    //     console.log("on change", this.checked);
    //     var id = this.id;
    //     var inputs = for_small;

    //     if(type == "for_big" || id == "for_big"){
    //         inputs = for_big;
    //     }
    //     for (var i = 0; i < inputs.length; i++) {
    //         inputs[i].disabled = !this.checked;
    //     }
    // }

});



