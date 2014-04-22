<?php

  define( "SITE_URL", get_bloginfo('url') );
  define( "THEME_URL", get_template_directory_uri() );

  add_action( 'wp_enqueue_scripts', 'wpmadrid_wp_enqueue_styles' );

  /**
   * Enqueue all necesary styles to header
   * @return void
   */
  function wpmadrid_wp_enqueue_styles() {

    global $wp_styles;

    wp_enqueue_style( 'redbull' , THEME_URL .'/css/wp-bootstrap.min.css', array()  , '1.0.1' , 'all' );

  }

  add_action( 'wp_enqueue_scripts', 'wpmadrid_wp_enqueue_scripts', 9 );

  /**
   * Enqueue all necesarry css styles to header
   * @return void
   */
  function wpmadrid_wp_enqueue_scripts() {

    global $wp_scripts;

    ## HEAD scritps
    if ( ! function_exists( 'wp_check_browser_version' ) )
      include_once( ABSPATH . 'wp-admin/includes/dashboard.php' );

    ## IE version conditional enqueue
    $response = wp_check_browser_version();
    if ( 0 > version_compare( intval( $response['version'] ) , 9 ) ) {
      wp_enqueue_script( 'html5tags', THEME_URL .'/js/html5tags.js', array(), '1.0.0' );
      wp_enqueue_script( 'html5shiv', THEME_URL .'/js/html5shiv.js', array(), '3.7.0' );
      wp_enqueue_script( 'respond' );
    }

    wp_deregister_script( 'jquery' );
    wp_enqueue_script( 'jquery', THEME_URL .'/js/jquery.min.js', array(), '1.11.0' , true );
    wp_enqueue_script( 'modernizr', THEME_URL .'/js/modernizr.min.js', array(), '2.7.1' , true );
    wp_enqueue_script( 'main', THEME_URL .'/js/dist/main.min.js', array('jquery'), '1.0.1' , true );
    wp_localize_script('main', 'wp', array( ) );
  }

  add_action('wp_head','wpmadrid_js_variables', 2);

  /**
   * Add JS variables with PHP dependiencies to head
   * @Note: Uses priority 2 in add_action hook
   * @return void
   */
  function wpmadrid_js_variables() {

    ?>
    <script type="text/javascript">
      var ajaxurl      = '<?php echo admin_url('admin-ajax.php'); ?>';
      var cookiepath   = '<?php echo COOKIEPATH; ?>';
      var cookiedomain = '<?php echo COOKIE_DOMAIN; ?>';
      var site_url     = '<?php echo SITE_URL; ?>';
    </script>
  <?php
  }

?>