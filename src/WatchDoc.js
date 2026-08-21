/*** Watch Doc ***/

// Watch the documentation page of a template when you watch the template
// Documentation at [[en:w:User:BrandonXLF/WatchDoc]]
// By [[en:w:User:BrandonXLF]]

$(function() {
	var namespace = mw.config.get('wgNamespaceNumber'),
		contentModel = mw.config.get('wgPageContentModel'),
		title = mw.config.get('wgPageName'),
		watchlink = $('#ca-watch a, #ca-unwatch a');

	if (
		(namespace !== 10 && namespace !== 11) ||
		(contentModel && contentModel !== 'wikitext') ||
		title.includes('/doc')
	) return;

	watchlink.click(function() {
		mw.loader.using('mediawiki.page.watch.ajax').then(function(require) {
			var clone = watchlink.clone().removeClass('loading'),
				docTitle = title + '/doc',
				shownDocTitle = mw.Title.newFromText(docTitle).getPrefixedText(),
				oldNotify = mw.notify;

			mw.notify = function(msg, opts) {
				// Change tag so both the doc and non-doc messages are shown
				if (~msg.text().indexOf(shownDocTitle)) opts.tag += '-doc';
				oldNotify(msg, opts);
			};

			require('mediawiki.page.watch.ajax').watchstar(clone, docTitle, function() {
				mw.notify = oldNotify;
			});

			clone.click();
		});
	});
});