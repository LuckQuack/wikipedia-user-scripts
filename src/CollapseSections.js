/*** Collapse Sections ***/

// Adds an arrow to sections to make them collapsible
// Documentation at [[en:w:User:BrandonXLF/CollapseSections]]
// By [[en:w:User:BrandonXLF]]

// window.collapseSections - Set to true to collapse all sections by default

mw.hook('wikipage.content').add(function(content) {
	if (mw.config.get('skin') === 'minerva') return;

	var usesSections = !!content.find('.mw-parser-output section[data-mw-section-id]').length,
		headingChanges = usesSections || !!content.find('.mw-heading').length;

	content.find(headingChanges ? '.mw-heading' : '.mw-parser-output :header:has(*)')
		.filter(function() {
			return !$(this).parent().hasClass('.mw-heading');
		})
		.each(function() {
			var heading = $(this),
				level = +(headingChanges ? heading.find(':header')[0] : this).nodeName[1],
				icon = $('<i class="mw-ui-icon-before mw-ui-icon-small mw-ui-icon mw-ui-icon-collapse"></i>');

			icon.click(function() {
				icon.toggleClass('mw-ui-icon-collapse');
				icon.toggleClass('mw-ui-icon-expand');

				if (usesSections) {
					heading.nextAll().toggleClass('hide-sect-h' + level);
				} else {
					var levelMatch = headingChanges ? '.mw-heading1' : 'h1:has(*)';
					for (var i = 2; i <= level; i++) levelMatch += ',' + (headingChanges ? ('.mw-heading' + i) : ('h' + i + ':has(*)'));
					heading.nextUntil(levelMatch).toggleClass('hide-sect-h' + level);
				}
			});

			if (window.collapseSections) icon.click();
			heading.prepend(icon);
		});
});

mw.loader.load(['mediawiki.ui.icon', 'oojs-ui.styles.icons-movement']);
mw.util.addCSS('[class*="hide-sec"]{display:none!important}');