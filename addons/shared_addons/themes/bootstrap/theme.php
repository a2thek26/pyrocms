<?php defined('BASEPATH') OR exit('No direct script access allowed');

class Theme_Bootstrap extends Theme {

    public $name           = 'Bootstrap';
    public $author         = 'Adam Kelsven';
    public $author_website = 'http://www.envisionitmedia.com/';
    public $website        = 'http://www.pyrocms.com/';
    public $description    = 'EIM Bootstrap template.';
    public $version        = '1.0';
    public $options        = array(
        'show_breadcrumbs' => array(
                            'title'       => 'Show Breadcrumbs',
                            'description' => 'Would you like to display breadcrumbs?',
                            'default'     => 'yes',
                            'type'        => 'radio',
                            'options'     => 'yes=Yes|no=No',
                            'is_required' => TRUE
						    ),
        'navigation_layout' =>  array(
                            'title'       => 'Navigation Layout',
                            'description' => 'How would you like the navigation displayed?',
                            'default'     => 'bar',
                            'type'        => 'select',
                            'options'     => 'bar=Bar|navbar-fixed-top=Fixed to top|navbar-fixed-bottom=Fixed to bottom',
                            'is_required' => TRUE
                            ),
        'inverted_nav' =>  array(
                            'title'       => 'Invert Nav Colors',
                            'description' => 'You want to use inverted colors for the nav?',
                            'default'     => 'no',
                            'type'        => 'select',
                            'options'     => 'no=No|yes=Yes',
                            'is_required' => TRUE
                            )
        );
}

/* End of file theme.php */