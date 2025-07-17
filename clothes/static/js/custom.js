// Custom js for backend (crud process)
// 7 Nop 2022 (Grid software, inc.)
// And global js for use in every template
// Update 5 Sept 2023
// Copy Right Authbox Company, Inc.

// Smart-admin-2
var responsiveHelper_datatable_tabletools = undefined;

var breakpointDefinition = {
    tablet : 1024,
    phone : 480
};

// Dahsboard page
function do_edit(uuid) {            
    window.location.href = "update/"+uuid;
};

function do_toggle(uuid) {
    if (confirm('Update visible menu?')) {
        $.ajax({
            url: "/dashboard/menu-dashboard-update-ajax/" + uuid, 
            success: function(result){   
                console.log(result);
                if (result == 'True')
                    window.location.href = "/dashboard/menu-dashboard";
                else
                    alert('Gagal update menu!')
            }
        });
    };
}

function do_delete(uuid, name) {
    if (confirm('Anda yakin menghapus data "'+name+ '"?')) {
        window.location.href = "delete/"+uuid;
    };
};

function do_create(selector, url) {
    // url = "{% url 'tags_create' %}"
    $(selector).click(function() {        
        window.location.href = url;   
    });
};

// sender = sumber form [form create atau update]
function do_cancel(selector, sender, url) {
    $(selector).click(function() {
        if (confirm('Batalkan proses "'+ sender + '"?')) {
            window.location.href = url;   
        };
    });
};

function do_create_table(url, one_record_only=false, edit_button=true, delete_button=true, button_create_selector="#do_create", toogle_button=false) {
    $.ajax({
        "url": url,
        "dataSrc": "",

        success: function(d) {
            var columns = [];                    
            var data = [];
            var res = {};
            var first_loop = true;
            var tmp_data = {};
            var main_col = '';
            var foto_idx = -1;   // # cari index 
            var tree_idx = -1;

            for(key in d) {

                if (first_loop) {
                    tmp = Object.keys(d[key]);
                    // console.log(key, tmp);

                    // extra column first
                    // columns.push({"title": "", "data": "icon"});                            

                    for (i in tmp) {
                        if  (tmp[i]=='icon')
                            columns.push({"title": "", "data": tmp[i]});     
                        else
                            columns.push({"title": tmp[i], "data": tmp[i]});     

                        // console.log('i=', i);
                        // console.log('=',tmp[i]);
                        if (i==3)
                            main_col = tmp[i];

                        if (tmp[i]=='Foto') {
                            foto_idx = i;
                        
                            // console.log('foto idx change', i);
                        };

                        if (tmp[i]=='Tree') {
                            // console.log('Tree ', i);
                            tree_idx = i;
                        };
                        // console.log('=',foto_idx);
                    };

                    // extra column last
                    // columns.push({"title": "Action", "data": "action"});                                                       
                    first_loop = !first_loop;                            
                };                        

                // console.log('main = ', main_col);
                tmp_data = d[key];
                tmp_data["icon"] = null;
                tmp_data["action"] = null;     
                
                // clear html tag in tmp_data:
                // console.log('tmp_data',tmp_data[j]);                                
                for (j in tmp_data) {                
                    //console.log('tmp_data[j]',tmp_data[j] );
                    if (!((tmp_data[j] == null) || (typeof tmp_data[j] != "string"))) {
                        tmp_data[j] = tmp_data[j].replace(/<\/?("[^"]*"|'[^']*'|[^>])*(>|$)/g, "");                    
                    };
                };
                // console.log('tmp_data',tmp_data);                                
                data.push(tmp_data);
            };

            //console.log('column = ', columns);
            //console.log('data = ', data);
            res["columns"] = columns;
            res["data"] = data;
            
            //console.log('data',data);            
            if (one_record_only)
                if (data.length >= 1)
                    $(button_create_selector).hide();
                    
            // ref : https://stackoverflow.com/questions/36046139/datatables-dynamic-columns-from-ajax-data-source
            // tidak menggunakan datatable ajax seperti biasa,
            // gunakan ajax di luar, kemudian hasilnya untuk populate datatable

            // console.log('foto_idx', foto_idx);

            // {% if one_record_only %}
            //     $("#do_create").hide();
            // {% endif %}

            // console.log('res.data=', res.data);

            if (res.data.length>0) {
                $("#datatable_tabletools").DataTable({
                    // dom: "Bfrtip",
                    "deferRender": true,    // for lazy load data (load per page)
                    "data": res.data,
                    "columns": res.columns,
                    "order": [[ 2, "desc" ]],   
                    "columnDefs": [
                        {
                            "targets": [ 1, 2 ],
                            "visible": false,
                            "searchable": false,
                        },  
                        { 
                            "targets": 0, 
                            "width": "5px",
                            "sortable": false,
                            "searchable": false,
                        },
                        { 
                            "targets": [ res.columns.length-2 ], 
                            "width": "100px",
                            "sortable": false,
                            "searchable": false,
                        },
                        {
                            // manfaatkan kondisi target yg harus integer, jika string maka tidak akan di jalankna
                            "targets": [ (foto_idx > -1) ? parseInt(foto_idx): '-1' ],
                            
                            render: function(data) {
                                console.log('inside target','"' + data + '"');
                                // console.log(foto_idx);

                                // if (foto_idx > -1) {
                                if (data != null && data != "")                                     
                                    return  '<img src="/media/' + data + 
                                            '" class="img-thumbnail">';
                                
                                return 'tidak ada';                                
                            }                    
                        }, 
                        {
                            "targets": [ (tree_idx > -1) ? parseInt(tree_idx): '-1' ],
                            render: function(data) {
                                // console.log('inside target',data);
                                // console.log(foto_idx);

                                // if (foto_idx > -1) {
                                if (data != null)                                                                         
                                    return  data.replaceAll('_>', '<i class="fa fa-long-arrow-right"></i> ');
                                
                                return '';
                            }   
                            
                        },
                        {
                            // tampilkan hiperlink di kolom pertama (agar dapat melakukan editing dengan klik field 1)
                            "targets": [ 3 ],
                            
                            render: function(data, type, row) {        
                                if (toogle_button)                    
                                    return  "<a href='javascript:void(0);' onclick='do_toggle(\"" + row.uuid + "\");' title='Toggle Data'>"+ 
                                        "<strong>" + data + "</strong>" +
                                        "</a>";                                
                                else
                                    return  "<a href='javascript:void(0);' onclick='do_edit(\"" + row.uuid + "\");' title='Edit Data'>"+ 
                                            "<strong>" + data + "</strong>" +
                                            "</a>";                                
                            }                    
                        }, 
                        { 
                            "targets": [ res.columns.length-1 ], 
                            "width": "60px",
                            "sortable": false,
                            "searchable": false,                                                            
                            render: function(data, type, row) {                                    
                                // console.log("Object=", Object.keys(res.columns)[0]);
                                // row["Name (id)"]
                                var tmp = '';
                                var row_value = row[main_col];
                                
                                // clear apostrope and quoted mark
                                row_value = row_value.replaceAll("'","");
                                row_value = row_value.replaceAll("\"","");                                                                
                                
                                if (edit_button) {
                                    // if (do_toggle)    
                                    //     tmp =   "<button onclick='do_toggle(\"" + row.uuid + "\");' class='btn btn-success btn-xs' title='Edit Data'> "+
                                    //             "    <i class='fa fa-edit'></i> "+                                                           
                                    //             "</button> ";
                                    // else
                                    tmp =   "<button onclick='do_edit(\"" + row.uuid + "\");' class='btn btn-success btn-xs' title='Edit Data'> "+
                                            "    <i class='fa fa-edit'></i> "+                                                           
                                            "</button> ";
                                };

                                if (delete_button)
                                    tmp = tmp +
                                            "<button onclick='do_delete(\"" + row.uuid + "\", \"" + 
                                            row_value + "\"" + ");' class='btn btn-danger btn-xs' title='Hapus Data'> "+
                                            "    <i class='fa fa-eraser'></i> "+                                                           
                                            "</button>";

                                if (toogle_button)
                                    tmp =   "<button onclick='do_toggle(\"" + row.uuid + "\");' class='btn btn-success btn-xs' title='Toggle Data'> "+
                                            "    <i class='fa fa-edit'></i> "+                                                           
                                            "</button> ";

                                return  "<div class='toolbar text-right'>" + tmp +
                                        "</div>";                                    
                            }
                        },
                    ],
                    "sDom": "<'dt-toolbar text-right'<'col-xs-12 col-sm-6 'f><'toolbar'>r>"+                
                            "t"+
                            "<'dt-toolbar-footer'<'col-sm-6 col-xs-12 hidden-xs'i><'col-sm-6 col-xs-12'p>>",      
                    "autoWidth" : true,
                    
                });
            }
            else {
                // console.log($("#no-data").val());

                $("#no-data").empty();
                $("#no-data").append(
                    '<p class="alert alert-info no-margin">' +
                        'No data to display ...  '+
                    '</p>');
            };

        }
    }); 
};

// Send WA
function openWA(number, initial_text, is_mobile=false) {
    //var number = document.getElementById("waNumber").value;
    //if (isMobile()=="true")
    // initial_text: Hai, Saya ada pertanyaan tentang cara membuat website di https://authbox.web.id/
    // console.log('number',number);
    if (is_mobile) {
        window.open("https://api.whatsapp.com/send?phone="+ number +"&text=" + initial_text,"_blank");
    } else {
        window.open("https://web.whatsapp.com/send?phone="+ number +"&text=" + initial_text,"_blank");
    }
    //else
    //   alert("This link will open Whatsapp on android");
};

// Jika auto resize aktif:
function resizeImage(file, maxWidth, maxHeight, callback) {
    const reader = new FileReader();

    reader.onload = function(event) {
        const img = new Image();
        img.onload = function() {
            let width = img.width;
            let height = img.height;

            // Maintain aspect ratio
            if (width > height) {
                if (width > maxWidth) {
                height *= maxWidth / width;
                width = maxWidth;
                }
            } else {
                if (height > maxHeight) {
                width *= maxHeight / height;
                height = maxHeight;
                }
            };

            // Create canvas and resize image
            const canvas = document.createElement('canvas');
            canvas.width = width;
            canvas.height = height;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0, width, height);

            // Convert canvas to Blob or Base64
            canvas.toBlob(
                (blob) => {
                callback(blob); // Pass resized image blob to callback
                },
                file.type,
                0.9 // Quality (optional, for JPEG/WEBP)
            );
        };
        img.src = event.target.result;
    };

    reader.readAsDataURL(file);
};


function smartCropImage(file, targetWidth, targetHeight, callback) {
    const reader = new FileReader();

    reader.onload = function(event) {
        const img = new Image();
        img.onload = function() {
            // Create canvas for the final output
            const canvas = document.createElement('canvas');
            canvas.width = targetWidth;
            canvas.height = targetHeight;
            const ctx = canvas.getContext('2d');

            // Use Smartcrop to find the best crop
            SmartCrop.crop(img, {
                width: targetWidth,
                height: targetHeight,
                minScale: 0.8, // Minimum scale to consider (adjust as needed)
                ruleOfThirds: true,
                faceDetection: {
                    enabled: true,
                    weight: 0.9
                }
            }, function(result) {
                // Apply the best crop found
                const crop = result.topCrop;
                
                // Draw the cropped and resized image
                ctx.drawImage(
                    img,
                    crop.x, crop.y,            // Source x, y
                    crop.width, crop.height,   // Source width, height
                    0, 0,                      // Destination x, y
                    targetWidth, targetHeight  // Destination width, height
                );

                // Convert to Blob and pass to callback
                canvas.toBlob(
                    (blob) => {
                        callback(blob);
                    },
                    file.type || 'image/jpeg',  // Fallback to JPEG if type not available
                    0.9                        // Quality
                );
            });
        };
        img.src = event.target.result;
    };

    reader.readAsDataURL(file);
};


$(document).ready(function() {
    // PHOTO modification
    // ------------------
    /* SCRIPTS TO HANDLE THE CROPPER BOX */
    var $image = $("#image");
    var cropBoxData;
    var canvasData;
    var cropBox = {
        left : 0,
        top : 0,
        width : 400, //900, 
        height : 400 //700
    };      
    var ww = 0;
    var hh = 0; 





    $("#modalCrop").on("show.bs.modal", function () {
        // ww dan hh default sudah ada di masing2 template pemanggil
        // Baca data di interface untuk membedakan ukuran gambar
        // galery layanan ukuran lebih besar

        $(".js-crop-and-upload").removeAttr("disabled").text('Crop and Upload');

        // var banner_position = $("#id_banner-position").val();
        // if (banner_position != null) {
        //     if (banner_position == 'top' || banner_position == 'bottom') {
        //         ww = 728; hh = 90;
        //     }
        //     else {  // middle1 and middle2
        //         ww = 300; hh = 600;
        //     }
        // };        
        // console.log('This is inside crop');
        // console.log('Inside #modalCrop');
        // console.log(ww);
        // console.log(hh);
        // console.log("DIMENSI:");
        // console.log($("#id_dim_w").val());
        // console.log($("#id_dim_h").val());
        // DImensi ini di buat di form masing2

        ww = $("#id_dim_w").val();
        hh = $("#id_dim_h").val();
        // acpec ration tidak perlu hh/ww untuk kondisi hh>ww
        var aspect_ratio = ww/hh;
        console.log('aspect ratio', aspect_ratio);
        
        $image.cropper({
            viewMode: 0,    // mode 2 atau 0 untuk resize melewati ukuran gambar
            aspectRatio: aspect_ratio,
            zoomable: true,
            dragMode: 'move',
            center: true,
            cropBoxResizable: true,               

            // rotatable: true,
            // autoCropArea: 0.7,
            // highlight: false,
            // background: false,
            // viewMode: 1,
            // aspectRatio: 1/1,
            // minCropBoxWidth: ww,
            // minCropBoxHeight: hh,
            // width: ww,
            // height: hh,     
            
            ready: function () {                        
                $image.cropper('setCropBoxData', cropBox);                
                $image.cropper("setCanvasData", canvasData);
                $image.cropper("setCropBoxData", cropBoxData);                
            }
        });

    }).on("hidden.bs.modal", function () {
        console.log('on hidden event');
        cropBoxData = $image.cropper("getCropBoxData");
        canvasData = $image.cropper("getCanvasData");
        $image.cropper("destroy");
    });

    $(".js-zoom-in").on("click", function () {
        console.log('inside zoom in');
        $image.cropper("zoom", 0.1);
    });

    $(".js-zoom-out").on("click", function () {
    $image.cropper("zoom", -0.1);
    });

    $(".js-move-to-0-0").on("click", function () {
        console.log('inside move 0,0');
        $image.cropper("moveTo", 0.0);
    });

    /* SCRIPT TO COLLECT THE DATA AND POST TO THE SERVER */
    $(".js-crop-and-upload").on("click", function () {
        // $(".js-crop-and-upload").text('Waiting...');
        $(".js-crop-and-upload").attr("disabled", true).text('Processing ...');

        var cropData = $image.cropper("getData");
        var formID = $("#form-id").val();
        var canvas = $image.cropper("getCroppedCanvas");

        var save_as_png = $("#id_save_as_png").val();
        console.log('save_as_png=', save_as_png);

        // console.log(canvas);        
        // console.log('Inside #js-crop-and-upload');
        // console.log(ww);
        // console.log(hh);

        canvas.toBlob(function (blob) {
            var formData = new FormData();

            formData.append('photo', blob);          
            // console.log(blob);            
            let csrftoken = $('input[name="csrfmiddlewaretoken"]').val();
            // console.log(csrftoken);

            console.log('value before upload = ');
            console.log($("#id_file_path").val());
            console.log(formID);

            // var arr_idx = formID.split('-');
            // var idx = 0;
            // if (arr_idx.length >= 2)
            //     idx = arr_idx[1]
            // formData.append('old_photo', file_path[idx]);
            var tmp = '';
            if (save_as_png=="1") {                
                tmp = '1/';            
                console.log('do save as png');
            };

            $.ajax('/dashboard/upload-photo/' + ww + '/' + hh + '/' + tmp, {
                method: "POST",
                data: formData,
                processData: false,
                contentType: false,
                async: false,       // set false for waiting result, set time out too, to make limit time waiting
                cache: false,
                timeout: 30000,
                headers:{'X-CSRFToken':csrftoken},
                success: function (response) {
                    console.log('response = ');
                    console.log(response);
                    // file_path[idx] = response;
                    // $("#id_file_path").val(response);                    
                    // $('#id_str_file_path').val(response);
                    // alert($('#id_str_file_path').val());

                    $("#id_str_file_path").val(response);

                    //alert('done');

                    // console.log('outside canvas blob')
                    // console.log('result');
                    // console.log(cropData["x"]);
                    // console.log(cropData["y"]);
                    // console.log(cropData["height"]);
                    // console.log(cropData["width"]);
                    
                    // $("#id_"+ formID +"-x").val(cropData["x"]);
                    // $("#id_"+ formID +"-y").val(cropData["y"]);
                    // $("#id_"+ formID +"-height").val(cropData["height"]);
                    // $("#id_"+ formID +"-width").val(cropData["width"]);

                    //$("#formUpload").submit();
                    $("#modalCrop").modal('hide');
                },

                error: function () {
                    console.log('Upload error');
                }
            });

            //alert('after call ajax');
        });                

        // console.log('outside canvas blob')
        // console.log('result');
        // console.log(cropData["x"]);
        // console.log(cropData["y"]);
        // console.log(cropData["height"]);
        // console.log(cropData["width"]);
        
        // $("#id_"+ formID +"-x").val(cropData["x"]);
        // $("#id_"+ formID +"-y").val(cropData["y"]);
        // $("#id_"+ formID +"-height").val(cropData["height"]);
        // $("#id_"+ formID +"-width").val(cropData["width"]);

        // //$("#formUpload").submit();
        // $("#modalCrop").modal('hide');
    });


    // BACK to TOP
    /* [ Back to top ] */
    // myBtn harus ada
    try {
        var windowH = $(window).height()/2;

        $(window).on('scroll',function(){
            if ($(this).scrollTop() > windowH) {
                $("#myBtn").addClass('show-btn-back-to-top');
            } else {
                $("#myBtn").removeClass('show-btn-back-to-top');
            }
        });

        $('#myBtn').on("click", function(){
            $('html, body').animate({scrollTop: 0}, 300);
        });
    } catch(er) {console.log(er);}  

});   
