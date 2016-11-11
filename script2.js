var num = 9;
$(document).ready(function() {
    //set initial state.
    selectAll();
    $('.chbx').change(function(event) {
		if($(this).is(":checked")) {
            $('#G' + event.target.id).show();  
			num++;
			if (num == 9) 
			{
				$('.bMaster').val('None'); 
			}
        }
		else
		{
			$(this).attr('checked', false);
			$('#G' + event.target.id).hide();
			$('.bMaster').val('All'); 
			num--;
		} 
    });
	$('.bMaster').click(function() {
		if($('.bMaster').val()=='All') {
            selectAll();
        }
		else
		{
			selectNone();
		} 
    });
});

function selectAll ()
{
	
	num = 9;
	$('.chbx').attr('checked', true);  
	$('.grafica').show();
	$('.bMaster').val('None');
}
function selectNone ()
{
	$('.chbx').attr('checked', false); 
	$('.grafica').hide();
	$('.bMaster').val('All'); 
}