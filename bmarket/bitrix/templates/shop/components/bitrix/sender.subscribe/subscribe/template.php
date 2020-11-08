<?if(!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED!==true)die();
CModule::IncludeModule('subscribe');
?>
<script type="text/javascript" src="<?=SITE_TEMPLATE_PATH?>https://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js"></script>

<script type="text/javascript">
$(function(){
    $('.newsletter-btn').click(function(){
		var input=document.getElementById("input").value;
			$.ajax({ 
         type: "POST",
data: {input:input},
url: '/ajax.php', // обработчик
success: function(data){
alert(data);
		}
	});
    });
});

</script>
 
			<div class="container">
				<!-- row -->
				<div class="row">
					<div class="col-md-12">
						<div class="newsletter">
							<p>Sign Up for the <strong>NEWSLETTER</strong></p>
							<form id="news" action="<?=$arResult["FORM_ACTION"]?>">
								<input class="input" type="email" name="input" placeholder="Enter Your Email">
								<button id="newsletter-btn" name="newsletter-btn" class="newsletter-btn"><i class="fa fa-envelope"></i> Subscribe</button>
							</form>
							
</div>
</div>
</div>
</div>

