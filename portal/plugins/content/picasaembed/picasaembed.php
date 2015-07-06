<?php
/**
 * 
* @copyright Copyright (C) 2010 Lorenzo Carbonell. All rights reserved.
* @license GNU/GPL
*
* Version 1.7
* you can select autoplay
*/

// Check to ensure this file is included in Joomla!
defined( '_JEXEC' ) or die( 'Restricted access' );

jimport( 'joomla.plugin.plugin' );

/**
* Picasa Album Embedder Content Plugin
*
*/
class plgContentPicasaEmbed extends JPlugin
{

	/**
	* Constructor
	*
	* @param object $subject The object to observe
	* @param object $params The object that holds the plugin parameters
	*/
	function plgContentPicasaEmbed( &$subject, $params )
	{
		parent::__construct( $subject, $params );
	}

	/**
	* Example prepare content method in Joomla 1.5
	*
	* Method is called by the view
	*
	* @param object The article object. Note $article->text is also available
	* @param object The article params
	* @param int The 'page' number
	*/
	function onPrepareContent( &$article, &$params, $limitstart )
		{
		global $mainframe;
	
		if ( JString::strpos( $article->text, 'picasa_albumid' ) === false ) {
		return true;
		}

		$article->text = preg_replace('|(picasa_albumid=([a-zA-Z0-9_-]+))|e', '$this->picasaCodeEmbed("\2")', $article->text);
	
		return true;
	
	}

 	/**
	* Example prepare content method in Joomla 1.6/1.7/2.5
	*
	* Method is called by the view
	*
	* @param object The article object. Note $article->text is also available
	* @param object The article params
	*/   
	function onContentPrepare($context, &$row, &$params, $page = 0){
		jimport('joomla.html.parameter');
        
 		if ( JString::strpos( $row->text, 'picasa_albumid' ) === false ) {
            return true;
		}

		$row->text = preg_replace('|(picasa_albumid=([a-zA-Z0-9_-]+))|e', '$this->picasaCodeEmbed("\2")', $row->text);       
		return true;        
        
	}
    
    
    
 	/**
	* Function to inser the picasa gallery
	*
	* Method is called by the onContentPrepare or onPrepareContent
	*
	* @param string The text string to find and replace
	*/       
	function picasaCodeEmbed( $vCode )
	{

		$plugin =& JPluginHelper::getPlugin('content', 'picasaembed');
	 	$params = new JParameter( $plugin->params );

		$width = $params->get('width', 550);
		$height = $params->get('height', 445);
		$interval = $params->get('interval',5);
		$backgroundcolor = $params->get('backgroundcolor',"000000");
		$user = $params->get('user');
		$captions = $params->get('captions');
		$language = $params->get('language',"en");
		$autoplay = $params->get('autoplay');
		if($captions==1){
			if($autoplay==1){
				return '<embed type="application/x-shockwave-flash" src="http://picasaweb.google.com/s/c/bin/slideshow.swf" width="'.$width.'" height="'.$height.'" flashvars="host=picasaweb.google.com&captions=1&hl='.$language.'&feat=flashalbum&interval='.$interval.'&RGB=0x'.$backgroundcolor.'&feed=http%3A%2F%2Fpicasaweb.google.com%2Fdata%2Ffeed%2Fapi%2Fuser%2F'.$user.'%2Falbumid%2F'.$vCode.'%3Falt%3Drss%26kind%3Dphoto%26hl%3Des" pluginspage="http://www.macromedia.com/go/getflashplayer" wmode="transparent"></embed>';
			}else{
				return '<embed type="application/x-shockwave-flash" src="http://picasaweb.google.com/s/c/bin/slideshow.swf" width="'.$width.'" height="'.$height.'" flashvars="host=picasaweb.google.com&captions=1&noautoplay=1&hl='.$language.'&feat=flashalbum&interval='.$interval.'&RGB=0x'.$backgroundcolor.'&feed=http%3A%2F%2Fpicasaweb.google.com%2Fdata%2Ffeed%2Fapi%2Fuser%2F'.$user.'%2Falbumid%2F'.$vCode.'%3Falt%3Drss%26kind%3Dphoto%26hl%3Des" pluginspage="http://www.macromedia.com/go/getflashplayer" wmode="transparent"></embed>';
			}
		}else{	
			if($autoplay==1){
				return '<embed type="application/x-shockwave-flash" src="http://picasaweb.google.com/s/c/bin/slideshow.swf" width="'.$width.'" height="'.$height.'" flashvars="host=picasaweb.google.com&hl='.$language.'&feat=flashalbum&interval='.$interval.'&RGB=0x'.$backgroundcolor.'&feed=http%3A%2F%2Fpicasaweb.google.com%2Fdata%2Ffeed%2Fapi%2Fuser%2F'.$user.'%2Falbumid%2F'.$vCode.'%3Falt%3Drss%26kind%3Dphoto%26hl%3Des" pluginspage="http://www.macromedia.com/go/getflashplayer" wmode="transparent"></embed>';
			}else{
				return '<embed type="application/x-shockwave-flash" src="http://picasaweb.google.com/s/c/bin/slideshow.swf" width="'.$width.'" height="'.$height.'" flashvars="host=picasaweb.google.com&noautoplay=1&hl='.$language.'&feat=flashalbum&interval='.$interval.'&RGB=0x'.$backgroundcolor.'&feed=http%3A%2F%2Fpicasaweb.google.com%2Fdata%2Ffeed%2Fapi%2Fuser%2F'.$user.'%2Falbumid%2F'.$vCode.'%3Falt%3Drss%26kind%3Dphoto%26hl%3Des" pluginspage="http://www.macromedia.com/go/getflashplayer" wmode="transparent"></embed>';
			}
		}
	}
}
