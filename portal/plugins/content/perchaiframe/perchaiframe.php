<?php
 
// no direct access
defined( '_JEXEC' ) or die( 'Restricted access' );

/**
 * System plugin for browserassigntemplate Component
 * 
 * @package		browserassigntemplate
 * @subpackage	Plugins
 * @license		GNU/GPL
 * @copyright	Copyright (C) 2010 Brandon IT Consulting. All rights reserved.
 */

jimport( 'joomla.plugin.plugin' );

class plgContentperchaiframe extends JPlugin
{
        function plgContentperchaiframe(&$subject, $params)
       {
        
          parent::__construct($subject, $params);
       }
	function onContentPrepare($context, &$article, &$params)
	{
              
		$mainframe = JFactory::getApplication();
 
		if ($mainframe->isAdmin()) {
                    return;
                } 

		 // define the regular expression for the bot
		$regex = "#{iframe*(.*?)}(.*?){/iframe}#s";
               

		if (preg_match_all($regex, $article->text, $matches, PREG_PATTERN_ORDER) > 0) {
			$document =& JFactory::getDocument();
			$bs_count = -1;
                        $url ="";
                        $parameters="";
                        $urls = array();
                        $parameters = array();
			foreach ($matches[0] as $match) {
				$bs_count++;
				//split string and check for overrides
				$code = preg_replace("/{.+?}/", "", $match);
                                //$article->text .= $code;
                                $raw = explode ("|", $code);
                                 //$article->text .= "<br><br><br>".$raw[0];
                                $urls[count($urls)] = $raw[0];
                                 
                        }
                        foreach ($matches[1] as $match) {
				$bs_count++;
				//split string and check for overrides
				$code = preg_replace("%/{.+?}/%", "", $match);
                                //$article->text .= $code;
                                $raw = explode ("|", $code);
                                //$article->text .= "<br><br><br>".$raw[1];
                                $parameters[count($parameters)] = $raw[0];
                        }
                         
                      
                        
                        $cont=0;
                        foreach ($urls as $url) { 
                            $html ="\n"."<iframe  ".$parameters[$cont] ;
                            $html .="src=\"$urls[$cont]\" >"  ;
                            $html .="</iframe>"."\n"; 
                            $article->text = preg_replace($regex, $html, $article->text,1);
                            $cont++;
                        }
                        //replace the call with the slideshow
                        //$article->text = $this->perchaReplace($regex,$html, $article->text);
                        //$article->text .= $html;
                }

              
          
		// lets do the replacement
	       //$article->text = preg_replace_callback( $regex,'perchaframe_get',$article->text );
	 }

           
          /*function perchaReplace( $myneedle, $myreplacement, $myhaystack) {
 
            $myneedle = preg_quote($myneedle, '#');
            if(preg_match("#<p>(\s|<br />)*".$myneedle."(\s|<br />)*</p>#s", $myhaystack)>=1){
              $myhaystack = preg_replace( "#<p>(\s|<br />)*".$myneedle."(\s|<br />)*</p>#s", $myreplacement , $myhaystack ,1);
            }
            else{
              $myhaystack = preg_replace( "#".$myneedle."#s", $myreplacement , $myhaystack ,1);
            }
            return $myhaystack;
          }*/
 
}

/*
function perchaframe_get( &$matches ) {
 

	//$parser =& new SAXY_Lite_Parser();
	//$attribs = $parser->parseAttributes( html_entity_decode(@$matches[1], ENT_QUOTES) );

	 // Simple performance check to determine whether plugin should process further
      	$grabTags = str_replace("(","",str_replace(")","",implode(array_keys($tagReplace),"|")));

	$src	= trim(mosGetparam($attribs, 'src' , ""));
	if(@$matches[2]) $src	= @$matches[2];
	$width	= trim(mosGetparam($attribs, 'width' , "400px"));
	$height	= trim(mosGetparam($attribs, 'height'  , "400px"));
	$name	= trim(mosGetparam($attribs, 'name' , "tmp"));
	$align	= trim(mosGetparam($attribs, 'align'  , "center"));
	$scrolling	= trim(mosGetparam($attribs, 'scrolling'  , "true"));
	$frameborder	= trim(mosGetparam($attribs, 'frameborder'  , "0"));
	$infoshow	= trim(mosGetparam($attribs, 'infoshow'  , "")); 

	  $html ="\n"."<iframe width=\"$width\" ";
	  $html .="height=\"$height\" ";
	  $html .="src=\"$src\" ";
	  $html .="align=\"$align\" ";
	  $html .="SCROLLING=\"$scrolling\" ";
	  $html .="FRAMEBORDER=\"$frameborder\" name=\"$name\">"."\n";  
	  $html .="</iframe>"."\n";
	return $html;
	} 
 */
?>	
