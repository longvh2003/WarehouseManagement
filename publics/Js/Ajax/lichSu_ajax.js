$(document).ready(function(){
    $('.delete').on('click',function(e){
        e.preventDefault();
        var rowEl = $(this).closest('tr');
        var _id = rowEl.find('#_id').text();
        var todo = {
            _id : _id
        }
        $.ajax({
            url : '/lichSu/'+_id,
            type : "DELETE",
            data : todo,
            success : function(datas){
                if(datas == 'success'){
                    location.reload();
                }
                else alert('Hệ thống chưa thực hiện được yêu cầu của bạn!');
            }
        })
    })
    

    $('.print').on('click',function(e){
        e.preventDefault();
        var rowEl = $(this).closest('tr');
        var _id = rowEl.find('#_id').text();
        var todo = {
            _id : _id
        }
        var dateTime = new Date();
        $.ajax({
            url : '/lichSu/in/'+_id,
            type : "PUT",
            data : todo,
            success : function(datas){
                $('.print_body').append('\
                <div class="row group">\
					<div class="col-2 scontent2">\
						<div class="bold">Công ty ABC</div>\
						<div>Cầu giấy, Hà nội</div>\
					</div>\
					<div class="col-7">\
						<div class="bcontent bold">PHIẾU XUẤT KHO</div>\
						<div class="scontent">Ngày '+ dateTime.getDate() +' tháng '+ (dateTime.getMonth() + 1) +' năm '+ dateTime.getFullYear() +'</div>\
					</div>\
					<div class="col-3 scontent">Số phiếu: <input type="text" value="'+ datas._id +'"></div>\
					<div class="col-1"></div>\
					<div class="col-2 scontent2">\
						<div>Họ tên: </div>\
						<div>Theo hóa đơn số: </div>\
						<div>Xuất tại kho: </div>\
					</div>\
					<div class="col-9 scontent2">\
						<div>.................................................................................................................</div>\
						<div>.................................................................................................................</div>\
						<div>.................................................................................................................</div>\
					</div>\
					<table class="table table-bordered table-hover">\
					  	<thead>\
                            <tr>\
                            <th scope="col">Tên</th>\
			      		    <th scope="col">Thương hiệu</th>\
			      		    <th scope="col">Phân loại</th>\
			      		    <th scope="col">Serial</th>\
			      		    <th scope="col">Số lượng</th>\
			      		    <th scope="col">Nghiệp vụ</th>\
			      		    <th scope="col">Thời gian</th>\
					    	</tr>\
					  	</thead>\
                          <tbody>\
							<td> '+ datas.name +'</td>\
							<td> '+ datas.trademark +'</td>\
							<td> '+ datas.kind +'</td>\
							<td> '+ datas.serial +'</td>\
							<td> '+ datas.amount + " / " + datas.unit +'</td>\
							<td> '+ datas.action  +'</td>\
							<td> '+ datas.time +'</td>\
					  	</tbody>\
                    </table>\
                    <div class="kiTen">\
                        <h3>Kí tên</h3>\
                    </div>\
				</div>\
			</div>\
        </div>\
    </div>\
                ')


            }
        })
        $('#cancel').on('click',function(){
            location.reload();
        });
        $('#confirm_print').on('click',function(){
            location.reload();
        })
    })
})

function myPrint(divName){
    var printContents = document.getElementById(divName).innerHTML;
    var originalContents = document.body.innerHTML;

    document.body.innerHTML = printContents;

    window.print();

    document.body.innerHTML = originalContents;
}