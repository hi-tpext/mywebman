(function (w) {

    var tpextbuilder = function () { };
    tpextbuilder.autoPost = function (classname, url, refresh) {

        $('body').on('change', '.' + classname + ' :checkbox', function () {
            if ($(this).hasClass('switch-box')) {
                var text = $(this).parent('label').prev('input[type="hidden"]');
                var name = text.attr('name');
                var val = $(this).is(':checked') ? $(this).data('on') : $(this).data('off');
                name = name.split('-')[0];
                var dataid = $(this).parents('tr.table-row-id').data('id');
                tpextbuilder.autoSendData({
                    id: dataid,
                    name: name,
                    value: val
                }, url, refresh);
            }
            else {
                var name = $(this).attr('name');
                var values = [];
                $('.' + classname + " input[name='" + name + "']:checked").each(function (i, e) {
                    values.push($(e).val());
                });
                var val = values.join(',');
                name = name.split('-')[0];
                var dataid = $(this).parents('tr.table-row-id').data('id');
                tpextbuilder.autoSendData({
                    id: dataid,
                    name: name,
                    value: val
                }, url, refresh);
            }

        });

        $('body').on('change', '.' + classname + ' :radio', function () {
            var name = $(this).attr('name');
            var val = $('.' + classname + " input[name='" + name + "']:checked").val();
            name = name.split('-')[0];
            var dataid = $(this).parents('tr.table-row-id').data('id');
            tpextbuilder.autoSendData({
                id: dataid,
                name: name,
                value: val
            }, url, refresh);
        });

        var timer = null;

        $('body').on('change', '.' + classname + ' input[type="text"]', function () {
            clearTimeout(timer);
            var that = this;
            timer = setTimeout(function () {
                var name = $(that).attr('name');
                var val = $(that).val();
                name = name.split('-')[0];
                var dataid = $(that).parents('tr.table-row-id').data('id');
                tpextbuilder.autoSendData({
                    id: dataid,
                    name: name,
                    value: val
                }, url, refresh);
            }, 200);
        });

        $('body').on('change', '.' + classname + ' textarea', function () {
            clearTimeout(timer);
            var that = this;
            timer = setTimeout(function () {
                var name = $(that).attr('name');
                var val = $(that).val();
                name = name.split('-')[0];
                var dataid = $(that).parents('tr.table-row-id').data('id');
                tpextbuilder.autoSendData({
                    id: dataid,
                    name: name,
                    value: val
                }, url, refresh);
            }, 200);
        });

        $('body').on('change', '.' + classname + ' select', function () {
            var name = $(this).attr('name');
            var val = $(this).val();
            name = name.split('-')[0];
            var dataid = $(this).parents('tr.table-row-id').data('id');
            tpextbuilder.autoSendData({
                id: dataid,
                name: name,
                value: val
            }, url, refresh);
        });
    };

    tpextbuilder.postChecked = function (id, url, confirm) {
        var obj = $('#' + id);
        if (!obj.size()) {
            return;
        }
        $('body').on('click', '#' + id, function () {
            var val = '';

            var values = [];

            $("input.table-row:checked").each(function (i, e) {
                values.push($(e).val());
            });

            if (values.length == 0) {

                lightyear.notify('未选中任何数据', 'warning');

                return false;
            }

            val = values.join(',');

            if (confirm && confirm != '0' && confirm != 'false') {
                if (confirm == '1') {
                    var text = $('#' + id).text().trim() || $(this).attr('title');
                    confirm = '确定要执行批量<strong>' + text + '</strong>操作吗？';
                }
                $.alert({
                    title: '操作提示',
                    content: confirm,
                    type: 'orange',
                    buttons: {
                        confirm: {
                            text: '确认',
                            btnClass: 'btn-primary',
                            action: function () {
                                tpextbuilder.autoSendData({
                                    ids: val
                                }, url, 1);
                            }
                        },
                        cancel: {
                            text: '取消',
                            action: function () {

                            }
                        }
                    }
                });
            } else {
                tpextbuilder.autoSendData({
                    ids: val
                }, url, 1);
            }
        });

        if ($("input.table-row:checked").size() == 0) {
            $('#' + id).addClass('disabled');
        } else {
            $('#' + id).removeClass('disabled');
        }

        $('body').on('change', 'input.table-row', function () {
            if ($("input.table-row:checked").size() == 0) {
                $('#' + id).addClass('disabled');
            } else {
                $('#' + id).removeClass('disabled');
            }
        });

        $('body').on('change', 'input.table-row-checkall', function () {
            if ($("input.table-row:checked").is(':checked')) {
                $('#' + id).removeClass('disabled');
            } else {
                $('#' + id).addClass('disabled');
            }
        });
    };

    tpextbuilder.openChecked = function (id, url) {
        var obj = $('#' + id);
        if (!obj.size()) {
            return;
        }
        $('body').on('click', '#' + id, function () {
            var val = '';

            var values = [];

            $("input.table-row:checked").each(function (i, e) {
                values.push($(e).val());
            });

            if (values.length == 0) {

                lightyear.notify('未选中任何数据', 'warning');

                return false;
            }

            val = values.join(',');
            var size = $(this).data('layer-size');
            size = size ? size.split(',') : null;
            w.layerOpen(this, size, url + (/.+\?.*/.test(url) ? '&ids=' : '?ids=') + val);
            return false;
        });

        if ($("input.table-row:checked").size() == 0) {
            $('#' + id).addClass('disabled');
        } else {
            $('#' + id).removeClass('disabled');
        }

        $('body').on('change', 'input.table-row', function () {
            if ($("input.table-row:checked").size() == 0) {
                $('#' + id).addClass('disabled');
            } else {
                $('#' + id).removeClass('disabled');
            }
        });

        $('body').on('change', 'input.table-row-checkall', function () {
            if ($("input.table-row:checked").is(':checked')) {
                $('#' + id).removeClass('disabled');
            } else {
                $('#' + id).addClass('disabled');
            }
        });
    };

    tpextbuilder.postActionsChecked = function (id, confirms) {
        var obj = $('#' + id);
        if (!obj.size()) {
            return;
        }

        $('body').on('click', '#' + id + '-div .dropdown-menu li a', function () {

            var url = $(this).data('url');

            var confirm = confirms[url];

            var val = '';

            var values = [];

            $("input.table-row:checked").each(function (i, e) {
                values.push($(e).val());
            });

            if (values.length == 0) {

                lightyear.notify('未选中任何数据', 'warning');

                return false;
            }

            val = values.join(',');

            if (confirm && confirm != '0' && confirm != 'false') {
                if (confirm == '1') {
                    var text = $(this).text().trim();
                    confirm = '确定要执行批量<strong>' + text + '</strong>操作吗？';
                }
                $.alert({
                    title: '操作提示',
                    content: confirm,
                    type: 'orange',
                    buttons: {
                        confirm: {
                            text: '确认',
                            btnClass: 'btn-primary',
                            action: function () {
                                tpextbuilder.autoSendData({
                                    ids: val
                                }, url, 1);
                            }
                        },
                        cancel: {
                            text: '取消',
                            action: function () {

                            }
                        }
                    }
                });
            } else {
                tpextbuilder.autoSendData({
                    ids: val
                }, url, 1);
            }
        });

        if ($("input.table-row:checked").size() == 0) {
            $('#' + id).addClass('disabled');
        } else {
            $('#' + id).removeClass('disabled');
        }

        $('body').on('change', 'input.table-row', function () {
            if ($("input.table-row:checked").size() == 0) {
                $('#' + id).addClass('disabled');
            } else {
                $('#' + id).removeClass('disabled');
            }
        });

        $('body').on('change', 'input.table-row-checkall', function () {
            if ($("input.table-row:checked").is(':checked')) {
                $('#' + id).removeClass('disabled');
            } else {
                $('#' + id).addClass('disabled');
            }
        });
    };

    tpextbuilder.postRowid = function (classname, url, confirm) {
        $('body').on('click', '.row-__action__ .' + classname, function () {
            var val = $(this).data('id');
            if (confirm && confirm != '0' && confirm != 'false') {
                if (confirm == '1') {
                    var text = $(this).text().trim() || $(this).attr('title') || '此';
                    confirm = '确定要执行<strong>' + text + '</strong>操作吗？';
                }
                $.alert({
                    title: '操作提示',
                    content: confirm,
                    type: 'orange',
                    buttons: {
                        confirm: {
                            text: '确认',
                            btnClass: 'btn-primary',
                            action: function () {
                                tpextbuilder.autoSendData({
                                    ids: val
                                }, url, 1);
                            }
                        },
                        cancel: {
                            text: '取消',
                            action: function () {

                            }
                        }
                    }
                });
            } else {
                tpextbuilder.autoSendData({
                    ids: val
                }, url, 1);
            }
        });
    };

    tpextbuilder.postActionsRowid = function (classname, confirms) {
        $('body').on('click', '.row-__action__ .' + classname + ' .dropdown-menu li a', function () {
            var url = $(this).data('url');

            var confirm = confirms[url];

            var val = $('.row-__action__ .' + classname).data('id');
            if (confirm && confirm != '0' && confirm != 'false') {
                if (confirm == '1') {
                    var text = $(this).text().trim() || $(this).attr('title') || '此';
                    confirm = '确定要执行<strong>' + text + '</strong>操作吗？';
                }
                else if (confirm == '2') {
                    var size = $('.' + classname).find('.btn-actions').data('layer-size');
                    size = size ? size.split(',') : null;
                    w.layerOpen(this, size);
                    return false;
                }
                $.alert({
                    title: '操作提示',
                    content: confirm,
                    type: 'orange',
                    buttons: {
                        confirm: {
                            text: '确认',
                            btnClass: 'btn-primary',
                            action: function () {
                                tpextbuilder.autoSendData({
                                    ids: val
                                }, url, 1);
                            }
                        },
                        cancel: {
                            text: '取消',
                            action: function () {

                            }
                        }
                    }
                });
            } else {
                tpextbuilder.autoSendData({
                    ids: val
                }, url, 1);
            }
        });
    };

    tpextbuilder.autoSendData = function (data, url, refresh, del) {
        data.__token__ = w.__token__;
        data._method = /.+?\/(?:destroy|delete|remove|del)(?:\.\w+)?$/.test(url) ? "delete" : "patch";
        lightyear.loading('show');
        $.ajax({
            url: url,
            data: data,
            type: "POST",
            dataType: "json",
            success: function (data) {
                lightyear.loading('hide');
                if (data.__token__) {
                    w.__token__ = data.__token__;
                }
                if (data.status || data.code) {
                    lightyear.notify(data.msg || data.message || '操作成功！', 'success');
                    if (refresh) {
                        $('.search-refresh').trigger('click');
                    }
                } else {
                    lightyear.notify(data.msg || data.message || '操作失败', 'warning');
                }
                if (data.script || (data.data && data.data.script)) {
                    var script = data.script || data.data.script;
                    if ($('#script-div').size()) {
                        $('#script-div').html(script);
                    } else {
                        $('body').append(
                            '<div class="hidden" id="script-div">' + data.script + '</div>');
                    }
                }
            },
            error: function () {
                lightyear.loading('hide');
                lightyear.notify('网络错误', 'danger');
            }
        });
    };

    w.tpextbuilder = tpextbuilder;

    w.layerOpen = function (obj, size, url) {
        var href = url || $(obj).data('url') || $(obj).attr('url') || $(obj).attr('href');

        var text = $(obj).data('title') || $(obj).attr('title') || $(obj).text();
        if ($(obj).data('layer-size')) {
            size = $(obj).data('layer-size').split(',');
        }
        var winheight = $(window).height() - 14;
        layer.open({
            type: 2,
            title: text,
            shadeClose: false,
            scrollbar: false,
            maxmin: true,
            anim: 5,    //渐显
            shade: 0.3,
            maxHeight: winheight,
            area: size || ['90%', '400'],
            offset: '7px',
            content: href,
            success: function (layero, index) {
                if (!size || size[1] == 'auto' || size[1] == '' || size[1] == '0') {
                    var iframe = layero.find('iframe').get(0);

                    var mainheight = $(iframe.contentWindow.document.body).find('.panel-default.content').height() + 10;
                    if (mainheight < 400) {
                        mainheight = 400;
                    }
                    if (mainheight > winheight - 43) {
                        mainheight = winheight - 43;
                    }
                    $(iframe).height(mainheight);
                    //layero.css('top', ((winheight - mainheight - 43) / 2) + 'px');
                    layer.iframeAuto(index);
                }

                $(':focus').blur();
                this.enterEsc = function (event) {
                    if (event.keyCode === 13) {
                        return false; //阻止系统默认回车事件
                    }
                    if (event.keyCode === 0x1B) {
                        var index2 = layer.msg('关闭当前弹窗？', {
                            time: 2000,
                            btn: ['确定', '取消'],
                            yes: function (params) {
                                layer.close(index);
                                layer.close(index2);
                            }
                        });
                        return false; //阻止系统默认esc事件
                    }
                };
                $(document).on('keydown', this.enterEsc);	//监听键盘事件，关闭层
            },
            end: function () {
                $(document).off('keydown', this.enterEsc);	//解除键盘关闭事件
            }
        });

        return false;
    };

})(window);

window.renderFiles = function (elid) {

    /*
     * 示例上传成功采用返回ID的形式，即上传成功以附件表形式存储，返回给前端ID值。
     * 成功返回示例：{"status":200,"info":"成功","class":"success","id":1,"picurl":".\/upload\/images\/lyear_5ddfc00174bbb.jpg"}
     * 这里设定单图上传为js-upload-image，多图上传为js-upload-images
     * 存放预览图的div元素，命名：file_list_*；后面的上传按钮的命名：filePicker_*（这里的*跟隐藏的input的name对应）。方便单页面中存在有多个上传时区分以及使用。
     * input上保存上传后的图片ID以及设置上传时的一些参数，
     */
    elid = elid ? elid : '';
    // 通用绑定，
    $(elid + '.js-upload-files').each(function () {
        var $input_file = $(this).find('input.file-url-input'),
            $input_file_name = $(this).data('name');

        var jsOptions = window.uploadConfigs[$input_file_name];

        var $multiple = jsOptions.multiple, // 是否选择多个文件
            $ext = jsOptions.ext.join(','), // 支持的文件后缀
            $size = jsOptions.fileSingleSizeLimit; // 支持最大的文件大小

        var $file_list = $('#file_list_' + $input_file_name);
        var $file_list_upli = $('#file_list_' + $input_file_name + '_upli');

        var ratio = window.devicePixelRatio || 1;
        var thumbnailWidth = (jsOptions.thumbnailWidth || 165) * ratio;
        var thumbnailHeight = (jsOptions.thumbnailHeight || 110) * ratio;

        $file_list.find('li.pic-item').each(function (ii, ee) {
            var $li = $(ee);
            var $btn = $li.find('a.btn-link-pic');
            if ($btn && $btn.attr('href')) {
                var href = $btn.attr('href');
                $img = $li.find('img.preview-img');
                if (!jsOptions.isImage && !/.+\.(png|jpg|jpeg|gif|bmp|wbmp|webpg|ico)(\?.*)?$/i.test(href)) {
                    $btn.removeClass('btn-link-pic');
                    $btn.attr('target', '_blank');
                    $img.attr('src', '/index.php/tpextbuilder/index/file/extimg/type/' + href.replace(/.+?\.(\w+)$/, '$1'));
                }
                else {
                    $img.attr('src', href);
                }
                $img.css({
                    'display': 'block',
                    'max-width': thumbnailWidth + 'px',
                    'margin': '0 auto'
                }).parent('div').css({
                    'height': thumbnailHeight + 'px',
                    'width': thumbnailWidth + 'px',
                });
            }
        });


        if (jsOptions.canUpload || !jsOptions.istable) {

            $file_list_upli.css({
                'height': thumbnailHeight + 'px',
                'width': thumbnailWidth + 'px',
                'padding-left': '10px',
                'display': 'block',
            });

            var uploader = WebUploader.create({
                auto: true,
                chunked: true,
                prepareNextFile: true,
                duplicate: jsOptions.duplicate ? true : false,
                resize: jsOptions.resize ? true : false,
                swf: jsOptions.swf_url,
                server: jsOptions.upload_url,
                pick: {
                    id: '#picker_' + $input_file_name,
                    multiple: $multiple
                },
                fileSingleSizeLimit: $size,
                fileNumLimit: 99,
                fileSizeLimit: jsOptions.fileSizeLimit,
                accept: {
                    title: '文件',
                    extensions: $ext,
                    mimeTypes: jsOptions.mimeTypes || '*/*'
                },
                thumb: {
                    // 图片质量，只有type为`image/jpeg`的时候才有效。
                    quality: 70,
                    // 是否允许放大，如果想要生成小图的时候不失真，此选项应该设置为false.
                    allowMagnify: false,
                    // 是否允许裁剪。
                    crop: true,
                    // 为空的话则保留原有图片格式。
                    // 否则强制转换成指定的类型。
                    type: 'image/jpeg'
                }
            });

            uploader.on('beforeFileQueued', function (file) {
                if (jsOptions.fileNumLimit > 1 && $file_list.find('li.pic-item').size() >= jsOptions.fileNumLimit) {
                    lightyear.notify('最多允许上传' + jsOptions.fileNumLimit + '个文件', 'danger');
                    return false;
                }
            });
            uploader.on('fileQueued', function (file) {
                var $li = $('<li class="pic-item" id="' + file.id + '">' +
                    '  <figure>' +
                    '<div>' +
                    '    <img>' +
                    '</div>' +
                    '    <figcaption>' +
                    '      <a class="btn btn-xs btn-round btn-square btn-primary btn-link-pic" href="javascript:;"><i class="mdi mdi-eye"></i></a>' +
                    '      <a class="btn btn-xs btn-round btn-square btn-danger btn-remove-pic" href="javascript:;"><i class="mdi mdi-delete"></i></a>' +
                    '    </figcaption>' +
                    '  </figure>' +
                    '</li>'),
                    $img = $li.find('img');

                if (jsOptions.fileNumLimit <= 1) {
                    $file_list.find('li.pic-item').remove();
                }
                $file_list.append($li);
                uploader.makeThumb(file, function (error, src) {
                    if (!jsOptions.isImage && !/(png|jpg|jpeg|gif|bmp|wbmp|webpg|ico)$/i.test(file.ext) && error) {
                        src = '/index.php/tpextbuilder/index/file/extimg/type/' + file.ext;
                        $img.addClass('cantpreview');
                    }
                    else {
                        $img.addClass('imgpreview');
                    }
                    $img.attr('src', src);
                    $img.css({
                        'display': 'block',
                        'max-width': thumbnailWidth + 'px',
                        'margin': '0 auto'
                    }).parent('div').css({
                        'height': thumbnailHeight + 'px',
                        'width': thumbnailWidth + 'px',
                    });
                }, thumbnailWidth, thumbnailHeight);
                $('<div class="progress progress-xs"><div class="progress-bar progress-bar-primary progress-bar-striped" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%"></div></div>').appendTo($li);
            });
            uploader.on('uploadProgress', function (file, percentage) {
                var $percent = $('#' + file.id).find('.progress-bar');
                $percent.css('width', percentage * 100 + '%');
            });
            uploader.on('uploadSuccess', function (file, response) {
                var $li = $('#' + file.id);
                if (response.status == 200) { // 返回200成功
                    if (jsOptions.fileNumLimit > 1) {
                        if ($input_file.val()) {
                            $input_file.val($input_file.val() + ',' + response.picurl).trigger('change');
                        } else {
                            $input_file.val(response.picurl).trigger('change');
                        }
                        $li.find('.btn-remove-pic').attr('data-id', response.id).attr('data-url', response.picurl);
                    } else {
                        $input_file.val(response.picurl).trigger('change');
                    }
                }
                $('<div class="' + response.class + ' upload-result"></div>').text(response.info + '(' + $file_list.find('li.pic-item').size() + '/' + jsOptions.fileNumLimit + ')').appendTo($li.find('figure'));
                if ($li.find('.cantpreview').size() > 0) {
                    $li.find('a.btn-link-pic').attr('href', response.picurl).removeClass('btn-link-pic').attr('target', '_blank');
                } else {
                    $li.find('.imgpreview').attr('src', response.picurl);
                    $li.find('a.btn-link-pic').attr('href', response.picurl);
                }
                setTimeout(function () {
                    $li.find('.upload-result').remove();
                }, 3000);
            });
            uploader.on('uploadError', function (file) {
                var $li = $('#' + file.id);
                $('<div class="error upload-result">上传失败</div>').appendTo($li).find('figure');
                setTimeout(function () {
                    $li.remove();
                }, 3000);
            });
            uploader.on('error', function (type) {
                switch (type) {
                    case 'Q_TYPE_DENIED':
                        lightyear.notify('文件类型不正确，只允许上传后缀名为：' + $ext + '，请重新上传！', 'danger');
                        break;
                    case 'F_EXCEED_SIZE':
                        lightyear.notify('文件不得超过' + ($size / 1024) + 'kb，请重新上传！', 'danger');
                        break;
                }
            });
            uploader.on('uploadComplete', function (file) {
                setTimeout(function () {
                    $('#' + file.id).find('.progress').remove();
                }, 500);
            });
            // 删除操作
            $file_list.delegate('.btn-remove-pic', 'click', function () {
                var url = $(this).data('url');
                var that = $(this);
                $.alert({
                    title: '提示',
                    content: '确认要删除此文件吗？',
                    buttons: {
                        confirm: {
                            text: '确认',
                            btnClass: 'btn-primary',
                            action: function () {
                                if (jsOptions.fileNumLimit > 1) {
                                    var ids = $input_file.val().split(',');
                                    if (url) {
                                        for (var i = 0; i < ids.length; i++) {
                                            if (ids[i] == url) {
                                                ids.splice(i, 1);
                                                break;
                                            }
                                        }
                                        $input_file.val(ids.join(',')).trigger('change');
                                    }
                                } else {
                                    $input_file.val('').trigger('change');
                                }

                                that.closest('.pic-item').remove();
                            }
                        },
                        cancel: {
                            text: '取消',
                            action: function () {

                            }
                        }
                    }
                });
            });
        }

        // 接入图片查看插件
        $(this).magnificPopup({
            delegate: 'a.btn-link-pic',
            type: 'image',
            gallery: {
                enabled: true
            }
        });
    });
};

window.chooseFile = function (id, $input_file_name) {
    var jsOptions = window.uploadConfigs[$input_file_name];

    var $file_list = $('#file_list_' + $input_file_name);

    var chooseUrl = jsOptions.chooseUrl || '/admin/attachment/index?';

    if (jsOptions.fileNumLimit > 1 && $file_list.find('li.pic-item').size() >= jsOptions.fileNumLimit) {
        lightyear.notify('最多允许上传' + jsOptions.fileNumLimit + '个文件', 'danger');
        return false;
    }

    var obj = $('#' + id);

    var size = ['98%', '98%'];

    if (obj.data('layer-size')) {
        size = obj.data('layer-size').split(',');
    }

    layer.open({
        type: 2,
        title: '文件选择',
        shadeClose: false,
        scrollbar: false,
        shade: 0.3,
        anim: 2,    //从最底部往上滑入
        area: size,
        content: chooseUrl + 'choose=1&id=' + id + '&limit=' + jsOptions.fileNumLimit + '&ext=' + jsOptions.ext.join(','),
        success: function (layero, index) {
            $(':focus').blur();
            this.enterEsc = function (event) {
                if (event.keyCode === 13) {
                    return false; //阻止系统默认回车事件
                }
                if (event.keyCode === 0x1B) {
                    var index2 = layer.msg('关闭当前弹窗？', {
                        time: 2000,
                        btn: ['确定', '取消'],
                        yes: function (params) {
                            layer.close(index);
                            layer.close(index2);
                        }
                    });
                    return false; //阻止系统默认esc事件
                }
            };
            $(document).on('keydown', this.enterEsc);	//监听键盘事件，关闭层
        },
        end: function () {
            $(document).off('keydown', this.enterEsc);	//解除键盘关闭事件
            window.refreshFiles(jsOptions, $file_list, obj);
        }
    });
};

window.refreshFiles = function (jsOptions, $file_list, $input_file) {

    var ratio = window.devicePixelRatio || 1;
    var thumbnailWidth = (jsOptions.thumbnailWidth || 165) * ratio;
    var thumbnailHeight = (jsOptions.thumbnailHeight || 110) * ratio;

    $file_list.find('li.pic-item').remove();

    if ($input_file.val().trim() == '') {
        return;
    }

    var filesArr = $input_file.val().split(',');

    for (var i in filesArr) {
        var src = filesArr[i];
        var $li = $('<li class="pic-item" id="fild' + i + '">' +
            '  <figure>' +
            '<div style="width:' + thumbnailWidth + 'px;height:' + thumbnailHeight + 'px">' +
            '    <img class="preview-img" />' +
            '</div>' +
            '    <figcaption>' +
            '      <a class="btn btn-xs btn-round btn-square btn-primary btn-link-pic" href="' + src + '"><i class="mdi mdi-eye"></i></a>' +
            '      <a class="btn btn-xs btn-round btn-square btn-danger btn-remove-pic" href="javascript:;"><i class="mdi mdi-delete"></i></a>' +
            '    </figcaption>' +
            '  </figure>' +
            '</li>');
        var $img = $li.find('img');
        var $btn = $li.find('a.btn-link-pic');
        $li.find('.btn-remove-pic').attr('data-id', i).attr('data-url', src);
        $file_list.append($li);
        if (!jsOptions.isImage && !/.+\.(png|jpg|jpeg|gif|bmp|wbmp|webpg|ico)$/i.test(src)) {
            src = '/index.php/tpextbuilder/index/file/extimg/type/' + src.replace(/.+?\.(\w+)$/, '$1');
            $img.addClass('cantpreview');
            $btn.removeClass('btn-link-pic');
            $btn.attr('target', '_blank');
        }
        $img.attr('src', src);
        $img.css({
            'display': 'block',
            'max-width': thumbnailWidth + 'px',
            'margin': '0 auto'
        }).parent('div').css({
            'height': thumbnailHeight + 'px',
            'width': thumbnailWidth + 'px',
        });
    }
}

$(function () {
    //动态选择框，上下级选中状态变化
    window.renderFiles();
});