<?php
/*------------------------------------------------------------------------
# com_admirorgallery - Admiror Gallery Component
# ------------------------------------------------------------------------
# author   Igor Kekeljevic & Nikola Vasiljevski
# copyright Copyright (C) 2011 admiror-design-studio.com. All Rights Reserved.
# @license - http://www.gnu.org/licenses/gpl-2.0.html GNU/GPL
# Websites: http://www.admiror-design-studio.com/joomla-extensions
# Technical Support:  Forum - http://www.vasiljevski.com/forum/index.php
# Version: 4.5.0
-------------------------------------------------------------------------*/
if($_GET['img'] == "")
exit;

$original_file = urldecode($_GET['img']);
$new_h = intval($_GET['height']);
$original_strtolower=strtolower(basename($original_file));

// Create src_img
if (preg_match("/jpg|jpeg/i", $original_strtolower)) {
     @$src_img = imagecreatefromjpeg($original_file);
} else if (preg_match("/png/i", $original_strtolower)) {
     @$src_img = imagecreatefrompng($original_file);
} else if (preg_match("/gif/i", $original_strtolower)) {
     @$src_img = imagecreatefromgif($original_file);
}

@$src_width = imageSX($src_img);//$src_width
@$src_height = imageSY($src_img);//$src_height
$src_w=$src_width;
$src_h=$src_height;
$src_x=0;
$src_y=0;
$dst_h = $new_h;
$src_ratio=$src_w/$src_h;
$dst_w = $dst_h*$src_ratio;


if($dst_w > 200){
     $dst_w = 200;
     // KEEP HEIGHT, CROP WIDTH
     $src_w = $src_h*(200/$dst_h);
     $src_x = floor(($src_width-$src_w)/2);
}

@$dst_img = imagecreatetruecolor($dst_w, $dst_h);

//PNG THUMBS WITH ALPHA PATCH
if (preg_match("/png/i", $original_strtolower)) {
// Turn off alpha blending and set alpha flag
     @imagealphablending($dst_img, false);
     @imagesavealpha($dst_img, true);
}

@imagecopyresampled($dst_img, $src_img, 0, 0, $src_x, $src_y, $dst_w, $dst_h, $src_w, $src_h);

if (preg_match("/jpg|jpeg/i", $original_strtolower)) {
     @imagejpeg($dst_img);
} else if (preg_match("/png/i", $original_strtolower)) {
     @imagepng($dst_img);
} else if (preg_match("/gif/i", $original_strtolower)) {
     @imagegif($dst_img);
}

@imagedestroy($dst_img);
@imagedestroy($src_img);

?>