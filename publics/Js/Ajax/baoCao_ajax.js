$(document).ready(function () {
    $('#baoCao_confirm').on('click', function (e) {
        e.preventDefault();
        $('tbody').empty();
        var startTime = $('#startTime').val();
        var finishTime = $('#finishTime').val();

        var actione = $('#action').val();
        var todo = {
            startTime: startTime,
            finishTime: finishTime,
            action: actione
        }
        console.log(todo);
        $.ajax({
            url: '/baoCao/xuatBaoCao',
            type: "PUT",
            data: todo,
            success: function (datas) {
                if (datas == 'null') {
                    alert('Không tìm thấy dữ liệu phù hợp!');
                }
                else {
                    $('#form_export').append('\
                        <input value="'+startTime+'" name="startTime_ex" style="display: none;">\
                        <input value="'+finishTime+'" name="finishTime_ex" style="display: none;">\
                        <input value="'+actione+'" name="action_ex" style="display: none;">\
                    ')
                    datas.forEach(element => {
                        $('tbody').append('\
                                <tr>\
                                    <td> ' + element.name + '</td>\
                                    <td> ' + element.trademark + '</td>\
                                    <td> ' + element.kind + '</td>\
                                    <td> ' + element.serial + '</td>\
                                    <td> ' + element.amount + '</td>\
                                    <td> ' + element.unit + '</td>\
                                    <td> ' + element.note + '</td>\
                                </tr>\
                            ');
                    });

                }
            }
        })
    })
    $('#exportExcel').on('click', function (e) {
        e.preventDefault();
        var startTime = $('#startTime').val();
        var finishTime = $('#finishTime').val();

        var actione = $('#action').val();
        var todo = {
            startTime: startTime,
            finishTime: finishTime,
            action: actione
        }
        $.ajax({
            url: '/baoCao/export',
            type: "POST",
            data: todo,
            success: function (datas){
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


function myPrint(divName) {
    var printContents = document.getElementById(divName).innerHTML;
    var originalContents = document.body.innerHTML;

    document.body.innerHTML = printContents;

    window.print();

    document.body.innerHTML = originalContents;
}