/**
 * CKEditor Media Embed Handler
 * Converts <oembed> tags from CKEditor to actual iframe embeds
 * Supports: Google Maps, YouTube, and other media URLs
 */

(function () {
    'use strict';

    /**
     * Convert Google Maps URL to embed iframe
     */
    function convertGoogleMapsEmbed(url) {
        // Handle different Google Maps URL formats
        var embedUrl = '';

        // maps.app.goo.gl short links - need to extract place ID or convert to embed
        if (url.includes('maps.app.goo.gl') || url.includes('goo.gl/maps')) {
            // For shortened Google Maps links, we'll use the URL directly in embed
            // Extract the path and create an embed URL
            embedUrl = 'https://www.google.com/maps?output=embed&q=' + encodeURIComponent(url);
        }
        // Standard google.com/maps URLs
        else if (url.includes('google.com/maps')) {
            // Check if it already has embed in URL
            if (url.includes('/embed')) {
                embedUrl = url;
            } else {
                // Convert to embed URL
                // Extract coordinates or place info and create embed URL
                var urlObj = new URL(url);
                var searchParams = urlObj.searchParams;

                // If there's a place parameter
                if (searchParams.has('q')) {
                    embedUrl = 'https://www.google.com/maps?output=embed&q=' + searchParams.get('q');
                }
                // If there's a place_id
                else if (searchParams.has('place_id')) {
                    embedUrl = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d' + searchParams.get('place_id');
                }
                // Try to parse the URL path for coordinates or location
                else {
                    // For URLs like /maps/@lat,lng,zoom or /maps/place/...
                    embedUrl = url.replace('/maps/', '/maps/embed/');
                    if (!embedUrl.includes('output=embed')) {
                        embedUrl = 'https://www.google.com/maps?output=embed&q=' + encodeURIComponent(url);
                    }
                }
            }
        }

        if (embedUrl) {
            return '<div class="media-embed-wrapper google-maps-embed">' +
                '<iframe src="' + embedUrl + '" ' +
                'width="100%" height="450" ' +
                'style="border:0;" ' +
                'allowfullscreen="" ' +
                'loading="lazy" ' +
                'referrerpolicy="no-referrer-when-downgrade">' +
                '</iframe>' +
                '</div>';
        }

        return null;
    }

    /**
     * Convert YouTube URL to embed iframe
     */
    function convertYouTubeEmbed(url) {
        var videoId = '';

        // Extract YouTube video ID from various URL formats
        var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
        var match = url.match(regExp);

        if (match && match[2].length === 11) {
            videoId = match[2];
        }

        if (videoId) {
            return '<div class="media-embed-wrapper youtube-embed">' +
                '<div class="embed-responsive embed-responsive-16by9">' +
                '<iframe class="embed-responsive-item" ' +
                'src="https://www.youtube.com/embed/' + videoId + '" ' +
                'allowfullscreen ' +
                'allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture">' +
                '</iframe>' +
                '</div>' +
                '</div>';
        }

        return null;
    }

    /**
     * Convert oembed tag to appropriate embed
     */
    function convertOembed(oembedElement) {
        var url = oembedElement.getAttribute('url');

        if (!url) {
            console.warn('oembed element missing url attribute');
            return;
        }

        var embedHtml = null;

        // Check URL type and convert accordingly
        if (url.includes('google.com/maps') || url.includes('maps.app.goo.gl') || url.includes('goo.gl/maps')) {
            embedHtml = convertGoogleMapsEmbed(url);
        }
        else if (url.includes('youtube.com') || url.includes('youtu.be')) {
            embedHtml = convertYouTubeEmbed(url);
        }

        // If we successfully converted the embed
        if (embedHtml) {
            var tempDiv = document.createElement('div');
            tempDiv.innerHTML = embedHtml;
            var embedElement = tempDiv.firstChild;

            // Replace the oembed element with the actual embed
            if (oembedElement.parentNode) {
                oembedElement.parentNode.replaceChild(embedElement, oembedElement);
            }
        } else {
            // Fallback: create a link to the URL
            var link = document.createElement('a');
            link.href = url;
            link.target = '_blank';
            link.textContent = 'View media: ' + url;
            link.className = 'media-embed-link';

            if (oembedElement.parentNode) {
                oembedElement.parentNode.replaceChild(link, oembedElement);
            }
        }
    }

    /**
     * Process all oembed elements on the page
     */
    function processOembeds() {
        var oembeds = document.querySelectorAll('oembed');

        if (oembeds.length > 0) {
            console.log('Found ' + oembeds.length + ' oembed element(s) to process');

            // Convert NodeList to Array to avoid issues when replacing elements
            Array.from(oembeds).forEach(function (oembed) {
                convertOembed(oembed);
            });
        }
    }

    // Run when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', processOembeds);
    } else {
        // DOM already loaded
        processOembeds();
    }

    // Also expose globally for dynamic content
    window.processMediaEmbeds = processOembeds;

})();
