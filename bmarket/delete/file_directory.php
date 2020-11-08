<?
function deleteDir($dir)
{
    $files = array_diff(scandir($dir), ['..', '.']);
    foreach ($files as $file) {
        $path = $dir . '/' . $file;
        if (is_dir($path)) {
            deleteDir($path);
        } else {
            unlink($path);
        }
    }
    rmdir($dir);
}
$directory = $_POST['sectionId'];
array_map('deleteDir',$directory);

?>
<?
$files = $_POST['sectionId'];
array_map('unlink',$files);
?>
