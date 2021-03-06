<?php
/**
 * @version   $Id: FieldTypePopulator.php 54344 2012-07-14 03:49:04Z steph $
 * @author    RocketTheme http://www.rockettheme.com
 * @copyright Copyright (C) 2007 - 2012 RocketTheme, LLC
 * @license   http://www.gnu.org/licenses/gpl-2.0.html GNU/GPLv2 only
 */

class RokSprocket_Provider_FieldsAttach_FieldTypePopulator implements RokCommon_Filter_IPicklistPopulator
{
    /**
     *
     * @return array;
     */
    public function getPicklistOptions()
    {
        $options = array();
        $db = JFactory::getDbo();
        $query = $db->getQuery(true);

        $query->select('f.id AS value, f.title AS text');
        $query->from('#__fieldsattach AS f');
        $query->join('LEFT', '#__fieldsattach_groups AS fg ON fg.id=f.groupid');
        $query->order('f.ordering ASC, f.title ASC');
        $query->where('fg.group_for = "0"');

        // Get the options.
        $db->setQuery($query);
        $items = $db->loadObjectList('value');


        // Check for a database error.
        if ($db->getErrorNum())
        {
            JError::raiseWarning(500, $db->getErrorMsg());
            return null;
        }

        foreach ($items as $item) {
            $options[$item->value] = $item->text;

        }
        return $options;
    }
}
