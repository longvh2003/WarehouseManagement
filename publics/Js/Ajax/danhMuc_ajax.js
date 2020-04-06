$(document).ready(function () {
    $('#form_nhap').on('submit', function (e) {
        e.preventDefault();
        var name = $('#name_form').val();
        var trademark = $('#trademark_form').val();
        var kind = $('#kind_form').val();
        var serial = $('#serial_form').val();
        var amount = $('#amount_form').val();
        var unit = $('#unit_form').val();
        var note = $('#note_form').val();
        var todo = {
            name: name,
            trademark: trademark,
            kind: kind,
            serial: serial,
            amount: amount,
            unit: unit,
            note: note
        }
        console.log(todo);
        $.ajax({
            url: '/danhMuc',
            type: 'POST',
            data: todo,
            success: function (datas) {
                if (datas == "success") {
                    location.reload();
                }
                else if (datas == "conflict serial") {
                    alert('Số serial đã tồn tại!')
                }
                else {
                    alert('Hệ thống chưa thực hiện được hành động của bạn!');
                }
            }
        })

    })
    $('table').on('click', '#delete', function () {
        var rowEl = $(this).closest('tr');
        var _id = rowEl.find('#_id').text();
        var name = rowEl.find('#name').text();
        var trademark = rowEl.find('#trademark').text();
        var kind = rowEl.find('#kind').text();
        var amount = rowEl.find('#amount').text();
        var unit = rowEl.find('#unit').text();
        var note = rowEl.find('#note').text();
        var serial = rowEl.find('#serial').text();

        var todo = {
            _id: _id,
            name: name,
            trademark: trademark,
            kind: kind,
            serial: serial,
            amount: amount,
            unit: unit,
            note: note
        };
        $.ajax({
            url: '/danhMuc/' + _id,
            type: "DELETE",
            data: todo,
            success: function (datas) {
                if (datas == "success") {
                    location.reload();
                }
                else {
                    alert('Hệ thống chưa thực hiện được hành động của bạn!');
                }
            }
        })
    })
    $('table').on('click', '#update', function (e) {
        e.preventDefault();
        var rowEl = $(this).closest('tr');
        var _id = rowEl.find('#_id').text();
        var name = rowEl.find('#name').text();
        var trademark = rowEl.find('#trademark').text();
        var serial = rowEl.find('#serial').text();
        var kind = rowEl.find('#kind').text();
        var amount = rowEl.find('#amount').text();
        var unit = rowEl.find('#unit').text();
        var note = rowEl.find('#note').text();
        var todo = {

        };
        console.log(todo);
        $("#form_update").append('\
        <label>Tên: </label><input type="text" value="'+ name + '" name="name_update" id="name_update">\
        <label>Thương hiệu: </label><input type="text" value="'+ trademark + '" name="trademark_update" id="trademark_update">\
        <label>Phân loại: </label><input type="text" value="'+ kind + '" name="kind_update" id="kind_update">\
        <label>Serial: </label><input type="text" value="'+ serial + '" name="serial_update" id="serial_update">\
        <label>Số lượng: </label><input type="text" value="'+ amount + '" name="amount_update" id="amount_update">\
        <label>Đơn vị: </label><input type="text" value="'+ unit + '" name="unit_update" id="unit_update">\
        <label>Ghi chú: </label><input type="text" value="'+ note + '" name="note_update" id="note_update">\
        ');
        $('#cancel').on('click', function () {
            location.reload();
        });
        $("#update_submit").on('click', function (e) {
            e.preventDefault();
            var name_update = $('#name_update').val();
            var trademark_update = $('#trademark_update').val();
            var kind_update = $('#kind_update').val();
            var serial_update = $('#serial_update').val();
            var amount_update = $('#amount_update').val();
            var unit_update = $('#unit_update').val();
            var note_update = $('#note_update').val();
            var todos = {
                name_update: name_update,
                trademark_update: trademark_update,
                kind_update: kind_update,
                serial_update: serial_update,
                amount_update: amount_update,
                unit_update: unit_update,
                note_update: note_update,
                _id: _id,
                name: name,
                trademark: trademark,
                kind: kind,
                serial: serial,
                amount: amount,
                unit: unit,
                note: note
            };
            $.ajax({
                url: '/danhMuc/' + _id,
                type: 'PUT',
                data: todos,
                success: function (datas) {
                    if (datas == 'err') {
                        alert('Hệ thống chưa thực hiện được thực hiện của bạn!');
                    }
                    else {
                        location.reload();
                    }
                }
            })
        })
    })
    $('#submit_xuatThuCong').on('click',function(e){
        e.preventDefault();
        var _id = $('#_id_xuatThuCong').val();
        var name = $('#name_xuatThuCong').val();
        var trademark = $('#trademark_xuatThuCong').val();
        var kind = $('#kind_xuatThuCong').val();
        var serial = $('#serial_xuatThuCong').val();
        var amount = $('#amount_xuatThuCong').val();
        var unit = $('#unit_xuatThuCong').val();
        var note = $('#note_xuatThuCong').val();
        var todo ={
            name: name,
            trademark: trademark,
            kind: kind,
            serial: serial,
            amount: amount,
            unit: unit,
            note: note
        };
        $.ajax({
            url : '/danhMuc/xuatKho/'+_id,
            type : 'PUT',
            data : todo,
            success : function(datas){
                if(datas == 'err find'){
                    alert('Không tìm thấy tên vật phẩm mà bạn nhập!');
                }
                else if(datas == 'not enough amount'){
                    alert('Số lượng xuất nhiều hơn số lượng hiện có trong kho!');
                }
                else{
                    location.reload();
                }
            }
        })

    })

    $('#submit_nhap_excel').on('click',function(e){
        e.preventDefault();
        var files = $('#ip_nhap_excel').get(0).files;
        var formData = new FormData();
        if(files.length === 0){
            alert('choose file upload');
            return false;
        }

        for(var i=0;i<files.length;i++){
            var file = files[i];
            formData.append('ip_nhap_excel',file,file.name);
        }
        $.ajax({
            url : '/danhMuc/nhapExcel/' + files[0].name,
            method : 'POST',
            data : formData,
            processData : false,
            contentType : false,
            success : function(datas){
                if(datas == 'success'){
                    alert('Nhập kho thành công');
                    location.reload();
                }
                
            },
            crossDomain : true
        })
    })


    $('#submit_xuat_excel').on('click',function(e){
        e.preventDefault();
        var files = $('#ip_xuat_excel').get(0).files;
        var formData = new FormData();
        if(files.length === 0){
            alert('choose file upload');
            return false;
        }

        for(var i=0;i<files.length;i++){
            var file = files[i];
            formData.append('ip_xuat_excel',file,file.name);
        }
        $.ajax({
            url : '/danhMuc/xuatExcel/' + files[0].name,
            method : 'PUT',
            data : formData,
            processData : false,
            contentType : false,
            crossDomain : true,
            success : function(datas){
                if(datas == 'success'){
                    alert('Hoàn thành!');
                    location.reload();
                }
                
            }
        })
    })
    $('#logout').on('click',function(e){
        e.preventDefault();
        $.ajax({
            url : 'dangNhap/logout',
            type : "POST",
            success : function(datas){
                if(datas=='success'){
                    window.location.replace('/dangNhap');
                }
                else{
                    alert("Hệ thống chưa thực hiện được yêu cầu của bạn!");
                }
            }
        })
    })
    
})