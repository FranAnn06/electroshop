<?if(!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED!==true)die();

CModule::IncludeModule('subscribe');

?>

<script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js"></script>

<script type="text/javascript">
    $(document).on('submit', '#news', function () {
        let form_data = $('#news').serialize();
        $.ajax({
            type: 'POST',
            url: 'ajax.php',
            data: form_data,
            success: function () {
                alert('Поздравляю,вы подписались!');
            }
        })

    })

</script>
<div style="border-top: 2px solid #E4E7ED; padding-top: 50px;">
<div class="container">
    <!-- row -->
    <div   class="row">
        <div  class="col-md-12">
            <div  class="newsletter">
                <p>Sign Up for the <strong>NEWSLETTER</strong></p>
                <form id="news">
                    <input id="email" class="input" type="email" name="email" placeholder="Enter Your Email">
                    <button type="submit" id="newsletter-btn" name="newsletter-btn" class="newsletter-btn">
                        <i class="fa fa-envelope"></i>
                        Subscribe
                    </button>
                </form>

            </div>
        </div>
    </div>
</div>
</div>
