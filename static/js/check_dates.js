function checkDates()
{
    date = new Date();
    if (date.getDate() >= 27 && date.getMonth() >= 5)
        $(".call_for_proposals").html("<strike>Call for proposals opens :: June 26, 2012</strike>");
    if (date.getDate() >= 26 && date.getMonth() >= 7)
        $(".deadline_for_proposals").html("<strike>Proposal submission deadline :: August 25, 2012</strike>");
    if (date.getDate() >= 1 && date.getMonth() >= 8)
        $(".acceptance_for_proposals").html("<strike>Proposal acceptance :: Aug 31, 2012</strike>");
    if (date.getDate() >= 16 && date.getMonth() >= 8)
        $(".first_presentation_upload").html("<strike>First presentation upload :: Sep 15, 2012</strike>");
    if (date.getDate() >= 26 && date.getMonth() >= 8)
        $(".final_presentation_upload").html("<strike>Final presentation upload (with changes if any) :: Sept 25, 2012</strike>");
    if (date.getDate() >= 1 && date.getMonth() >= 9)
        $(".conference_dates").html("<strike>Conference :: September 28th, 29th and 30th, 2012</strike>");

}
checkDates();