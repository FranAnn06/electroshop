<?
require($_SERVER["DOCUMENT_ROOT"] . "/bitrix/header.php");

IncludeModuleLangFile(__FILE__);

$context = \Bitrix\Main\Application::getInstance()->getContext();
$request = $context->getRequest();
$orderId = $request->get('orderId') ? $request->get('orderId') : $request->get('orderNumber');

if ($orderId) {
    if (\CModule::IncludeModule("kiora.yaka")) {
        
        $filter_adv = array('>ORDER_DATE_TIME' => \Bitrix\Main\Type\DateTime::createFromTimestamp(strtotime('-2 day')));

        $order = \Kiora\Payments\OrdersHistoryTable::orderFindByShopID($orderId, $filter_adv);

        if ($order !== null) {

            $amount = $order['ORDER_AMOUNT'];
            
            if ($order['PAYMENT_STATUS'] == 2) {
                $APPLICATION->SetTitle(GetMessage('YAKA_TOOLS_SUCC_TITLE'));
                ?>
                <h3 class="paymentMessage">
                    <?= GetMessage('YAKA_TOOLS_SUCC_MESS', array('#ID#' => $orderId, '#AMOUNT#' => $amount)) ?>
                </h3>
                <?
            }
            elseif($order['PAYMENT_STATUS'] == 3){
                $APPLICATION->SetTitle(GetMessage('YAKA_TOOLS_CANCEL_TITLE'));
                ?>
                <h3 class="paymentMessage">
                    <?= GetMessage('YAKA_TOOLS_CANCEL_MESS', array('#ID#' => $orderId, '#AMOUNT#' => $amount)) ?>
                </h3>
                <?
            }
            else{
                $APPLICATION->SetTitle(GetMessage('YAKA_TOOLS_PENDING_TITLE'));
                ?>
                <h3 class="paymentMessage">
                    <?= GetMessage('YAKA_TOOLS_PENDING_MESS', array('#ID#' => $orderId, '#AMOUNT#' => $amount)) ?>
                </h3>
                <?
            }
        } else {
            ?>
            <h3 class="paymentMessage">
                404 - not found!
            </h3>
            <?
        }
    } else {
        
    }
}
?>
<? require($_SERVER["DOCUMENT_ROOT"] . "/bitrix/footer.php"); ?>

