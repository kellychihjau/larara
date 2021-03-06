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


    // --- date picker in week ---
    var startDate;
    var endDate;

    var selectCurrentWeek = function() {
        window.setTimeout(function () {
            $('#week-picker').find('.ui-datepicker-current-day a').addClass('ui-state-active')
        }, 1);
    }

    $('#week-picker').datepicker( {
        showOtherMonths: true,
        selectOtherMonths: true,
        showButtonPanel: true,
        onSelect: function(dateText, inst) { 
            var date = $(this).datepicker('getDate');
            startDate = new Date(date.getFullYear(), date.getMonth(), date.getDate() - date.getDay()+1);
            endDate = new Date(date.getFullYear(), date.getMonth(), date.getDate() - date.getDay() + 7);
            var dateFormat = inst.settings.dateFormat || $.datepicker._defaults.dateFormat;
            $('#startDate').text($.datepicker.formatDate( dateFormat, startDate, inst.settings ));
            $('#endDate').text($.datepicker.formatDate( dateFormat, endDate, inst.settings ));

            selectCurrentWeek();
        },
        beforeShowDay: function(date) {
            var cssClass = '';
            if(date >= startDate && date <= endDate)
                cssClass = 'ui-datepicker-current-day';
            return [true, cssClass];
        },
        onChangeMonthYear: function(year, month, inst) {
            selectCurrentWeek();
        }, 
        _gotoToday: function(id){
            console.log("in go to today");
            $(".ui-datepicker-current-day").click();
        }
    });
    $.datepicker.regional['th'] = {
        closeText: 'ปิด',
        prevText: 'เดือนที่แล้ว',
        nextText: 'เดือนหน้า;',
        currentText: 'สัปดาห์นี้',
        monthNames: ['มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน', 'กรกฎาคม', 'สิงหาคม',
          'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'
        ],
        monthNamesShort: ['ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.', 'ก.ค.', 'สิ.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.'],
        dayNames: ['อาทิตย์', 'จันทร์', 'อังคาร', 'พุธ', 'พฤหัส', 'ศุกร์', 'เสาร์'],
        dayNamesShort: ['อา','จ', 'อ', 'พ', 'พฤ', 'ศ', 'ส'],
        dayNamesMin: ['อา', 'จ', 'อ', 'พ', 'พฤ', 'ศ', 'ส'],
        weekHeader: 'อาทิตย์',
        dateFormat: 'dd/mm/yy',
        firstDay: 1,
        isRTL: false,
        showMonthAfterYear: false,
        yearSuffix: ''
    };
    $.datepicker.setDefaults($.datepicker.regional['th']);

    $(".ui-datepicker-current-day").click();
    
    $(document).on( 'mousemove','#week-picker .ui-datepicker-calendar tr',function() {$(this).find('td a').addClass('ui-state-hover'); });
    $(document).on( 'mouseleave','#week-picker .ui-datepicker-calendar tr',function() {$(this).find('td a').removeClass('ui-state-hover'); });
    $(document).on('click', 'button.ui-datepicker-current', function(){ 
        //console.log("click!");
        $(".ui-datepicker-today").click(); 
    });
    //--

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

    // $( ".ui-sortable" ).sortable();
    // console.log("end sortable");

    var element = ".ui-sortable";
    var connect = ".ui-sortable";

    $(element).sortable({
        cancel: ".ui-state-disabled",
        connectWith: connect,
        cursor: "move",
        cursorAt: { top:5, left: 5 }, 
        dropOnEmpty: false
    });



    //------- CLASSROOM & KID SIDE MENU
    var path = window.location.pathname.split("/");
    var type = path[1];
    var id = path[2];
    if (type == "classroom"){
        var target = $("#"+type+id);
        target.addClass("active");
        target.parent().addClass("mm-active");
        target.next().addClass("mm-show");
    }else{
        var target = $("#"+type+id);
        target.addClass("active");
        var classroom = target.parent().parent().addClass("mm-show");
        classroom.parent().addClass("mm-active");
    }


    //------- KID PROFILE
    var input_ml = $("#milk-input-ml").bind("keyup change", updateMilkInput);
    var input_oz = $("#milk-input-oz").bind("keyup change", updateMilkInput);
    var input_box = $("#milk-input-box").bind("keyup change", updateMilkInput);

    function updateMilkInput(event){
        var changeId = event.target.id;
        if(changeId == "milk-input-ml"){
            var ml_val = input_ml.val();
            input_oz.val((ml_val/29.574).toFixed(2));            
            input_box.val((ml_val/180).toFixed(1));
        }else if(changeId == "milk-input-oz"){
            var oz_val = input_oz.val();
            input_ml.val((oz_val*29.574).toFixed(0));
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




