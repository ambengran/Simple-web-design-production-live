(function($){
    $.fn.ajaxForm = function(options) {
        var config = {
            successMessage: 'Your data has been submitted.',
            errorMessage: 'An error has occurred while processing your request',
            url: 'receive.php',
            beforeSend: function(form) {
                $(':input', form).prop('disabled', true);
            },
            success: function(data){
                alert(config.successMessage);
            },
            error: function(textStatus){
                alert(config.errorMessage);
            },
            complete: function(form){
                form.reset();
                $(':input', form).prop('disabled', false);
            }
        };

        if (typeof options == 'object') {
            config = $.extend(config, options);
        }

        $(this).submit(function(e){
            var form = $(this)[0];
            var form_data = new FormData(form);

            $.ajax({
                data: form_data,
                dataType: 'json',
                method: 'post',
                url: config.url,
                cache: false,
                contentType: false,
                processData: false,
                beforeSend: function() {
                    config.beforeSend(form);
                },
                success: function(data) {
                    config.success(data);
                },
                error: function(jqXHR, textStatus) {
                    config.error(textStatus);
                },
                complete: function() {
                    config.complete(form);
                }
            });

            e.preventDefault();
        });

        return this;
    };
}(jQuery));