﻿/*
* This file has been generated to support Visual Studio IntelliSense.
* You should not use this file at runtime inside the browser--it is only
* intended to be used only for design-time IntelliSense.  Please use the
* standard jQuery library for all production use.
*
* Comment version: 1.7.1
*/
/*!
* jQuery JavaScript Library v1.7.1
* http://jquery.com/
*
* Distributed in whole under the terms of the MIT
*
* Copyright 2010, John Resig
*
* Permission is hereby granted, free of charge, to any person obtaining
* a copy of this software and associated documentation files (the
* "Software"), to deal in the Software without restriction, including
* without limitation the rights to use, copy, modify, merge, publish,
* distribute, sublicense, and/or sell copies of the Software, and to
* permit persons to whom the Software is furnished to do so, subject to
* the following conditions:
*
* The above copyright notice and this permission notice shall be
* included in all copies or substantial portions of the Software.
*
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
* EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
* MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
* NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
* LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
* OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
* WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*
* Includes Sizzle.js
* http://sizzlejs.com/
* Copyright 2010, The Dojo Foundation
* Released under the MIT and BSD Licenses.
*
 * Documentation Content
 * Copyright (c) 2009 Packt Publishing, http://packtpub.com/
 * Copyright (c) 2012 jQuery Foundation, http://jquery.org/
 * 
 * This software consists of voluntary contributions made by many
 * individuals. For exact contribution history, see the revision history
 * and logs, available at http://github.com/jquery/api.jquery.com
 * 
 * Permission is hereby granted, free of charge, to any person obtaining
 * a copy of this software and associated documentation files (the
 * "Software"), to deal in the Software without restriction, including
 * without limitation the rights to use, copy, modify, merge, publish,
 * distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to
 * the following conditions:
 * 
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
 * LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 * OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/
(function ( window, undefined ) {
var jQuery = function( selector, context ) {
/// <summary>
///     1: Accepts a string containing a CSS selector which is then used to match a set of elements.
///     &#10;    1.1 - $(selector, context) 
///     &#10;    1.2 - $(element) 
///     &#10;    1.3 - $(object) 
///     &#10;    1.4 - $(elementArray) 
///     &#10;    1.5 - $(jQuery object) 
///     &#10;    1.6 - $()
///     &#10;2: Creates DOM elements on the fly from the provided string of raw HTML.
///     &#10;    2.1 - $(html, ownerDocument) 
///     &#10;    2.2 - $(html, props)
///     &#10;3: Binds a function to be executed when the DOM has finished loading.
///     &#10;    3.1 - $(callback)
/// </summary>
/// <param name="selector" type="String">
///     A string containing a selector expression
/// </param>
/// <param name="context" type="jQuery">
///     A DOM Element, Document, or jQuery to use as context
/// </param>
/// <returns type="jQuery" />

		// The jQuery object is actually just the init constructor 'enhanced'
		return new jQuery.fn.init( selector, context, rootjQuery );
	};
jQuery.Callbacks = function( flags ) {
/// <summary>
///     A multi-purpose callbacks list object that provides a powerful way to manage callback lists.
/// </summary>
/// <param name="flags" type="String">
///     An optional list of space-separated flags that change how the callback list behaves.
/// </param>


	// Convert flags from String-formatted to Object-formatted
	// (we check in cache first)
	flags = flags ? ( flagsCache[ flags ] || createFlags( flags ) ) : {};

	var // Actual callback list
		list = [],
		// Stack of fire calls for repeatable lists
		stack = [],
		// Last fire value (for non-forgettable lists)
		memory,
		// Flag to know if list is currently firing
		firing,
		// First callback to fire (used internally by add and fireWith)
		firingStart,
		// End of the loop when firing
		firingLength,
		// Index of currently firing callback (modified by remove if needed)
		firingIndex,
		// Add one or several callbacks to the list
		add = function( args ) {
			var i,
				length,
				elem,
				type,
				actual;
			for ( i = 0, length = args.length; i < length; i++ ) {
				elem = args[ i ];
				type = jQuery.type( elem );
				if ( type === "array" ) {
					// Inspect recursively
					add( elem );
				} else if ( type === "function" ) {
					// Add if not in unique mode and callback is not in
					if ( !flags.unique || !self.has( elem ) ) {
						list.push( elem );
					}
				}
			}
		},
		// Fire callbacks
		fire = function( context, args ) {
			args = args || [];
			memory = !flags.memory || [ context, args ];
			firing = true;
			firingIndex = firingStart || 0;
			firingStart = 0;
			firingLength = list.length;
			for ( ; list && firingIndex < firingLength; firingIndex++ ) {
				if ( list[ firingIndex ].apply( context, args ) === false && flags.stopOnFalse ) {
					memory = true; // Mark as halted
					break;
				}
			}
			firing = false;
			if ( list ) {
				if ( !flags.once ) {
					if ( stack && stack.length ) {
						memory = stack.shift();
						self.fireWith( memory[ 0 ], memory[ 1 ] );
					}
				} else if ( memory === true ) {
					self.disable();
				} else {
					list = [];
				}
			}
		},
		// Actual Callbacks object
		self = {
			// Add a callback or a collection of callbacks to the list
			add: function() {
				if ( list ) {
					var length = list.length;
					add( arguments );
					// Do we need to add the callbacks to the
					// current firing batch?
					if ( firing ) {
						firingLength = list.length;
					// With memory, if we're not firing then
					// we should call right away, unless previous
					// firing was halted (stopOnFalse)
					} else if ( memory && memory !== true ) {
						firingStart = length;
						fire( memory[ 0 ], memory[ 1 ] );
					}
				}
				return this;
			},
			// Remove a callback from the list
			remove: function() {
				if ( list ) {
					var args = arguments,
						argIndex = 0,
						argLength = args.length;
					for ( ; argIndex < argLength ; argIndex++ ) {
						for ( var i = 0; i < list.length; i++ ) {
							if ( args[ argIndex ] === list[ i ] ) {
								// Handle firingIndex and firingLength
								if ( firing ) {
									if ( i <= firingLength ) {
										firingLength--;
										if ( i <= firingIndex ) {
											firingIndex--;
										}
									}
								}
								// Remove the element
								list.splice( i--, 1 );
								// If we have some unicity property then
								// we only need to do this once
								if ( flags.unique ) {
									break;
								}
							}
						}
					}
				}
				return this;
			},
			// Control if a given callback is in the list
			has: function( fn ) {
				if ( list ) {
					var i = 0,
						length = list.length;
					for ( ; i < length; i++ ) {
						if ( fn === list[ i ] ) {
							return true;
						}
					}
				}
				return false;
			},
			// Remove all callbacks from the list
			empty: function() {
				list = [];
				return this;
			},
			// Have the list do nothing anymore
			disable: function() {
				list = stack = memory = undefined;
				return this;
			},
			// Is it disabled?
			disabled: function() {
				return !list;
			},
			// Lock the list in its current state
			lock: function() {
				stack = undefined;
				if ( !memory || memory === true ) {
					self.disable();
				}
				return this;
			},
			// Is it locked?
			locked: function() {
				return !stack;
			},
			// Call all callbacks with the given context and arguments
			fireWith: function( context, args ) {
				if ( stack ) {
					if ( firing ) {
						if ( !flags.once ) {
							stack.push( [ context, args ] );
						}
					} else if ( !( flags.once && memory ) ) {
						fire( context, args );
					}
				}
				return this;
			},
			// Call all the callbacks with the given arguments
			fire: function() {
				self.fireWith( this, arguments );
				return this;
			},
			// To know if the callbacks have already been called at least once
			fired: function() {
				return !!memory;
			}
		};

	return self;
};
jQuery.Deferred = function( func ) {

		var doneList = jQuery.Callbacks( "once memory" ),
			failList = jQuery.Callbacks( "once memory" ),
			progressList = jQuery.Callbacks( "memory" ),
			state = "pending",
			lists = {
				resolve: doneList,
				reject: failList,
				notify: progressList
			},
			promise = {
				done: doneList.add,
				fail: failList.add,
				progress: progressList.add,

				state: function() {
					return state;
				},

				// Deprecated
				isResolved: doneList.fired,
				isRejected: failList.fired,

				then: function( doneCallbacks, failCallbacks, progressCallbacks ) {
					deferred.done( doneCallbacks ).fail( failCallbacks ).progress( progressCallbacks );
					return this;
				},
				always: function() {
					deferred.done.apply( deferred, arguments ).fail.apply( deferred, arguments );
					return this;
				},
				pipe: function( fnDone, fnFail, fnProgress ) {
					return jQuery.Deferred(function( newDefer ) {
						jQuery.each( {
							done: [ fnDone, "resolve" ],
							fail: [ fnFail, "reject" ],
							progress: [ fnProgress, "notify" ]
						}, function( handler, data ) {
							var fn = data[ 0 ],
								action = data[ 1 ],
								returned;
							if ( jQuery.isFunction( fn ) ) {
								deferred[ handler ](function() {
									returned = fn.apply( this, arguments );
									if ( returned && jQuery.isFunction( returned.promise ) ) {
										returned.promise().then( newDefer.resolve, newDefer.reject, newDefer.notify );
									} else {
										newDefer[ action + "With" ]( this === deferred ? newDefer : this, [ returned ] );
									}
								});
							} else {
								deferred[ handler ]( newDefer[ action ] );
							}
						});
					}).promise();
				},
				// Get a promise for this deferred
				// If obj is provided, the promise aspect is added to the object
				promise: function( obj ) {
					if ( obj == null ) {
						obj = promise;
					} else {
						for ( var key in promise ) {
							obj[ key ] = promise[ key ];
						}
					}
					return obj;
				}
			},
			deferred = promise.promise({}),
			key;

		for ( key in lists ) {
			deferred[ key ] = lists[ key ].fire;
			deferred[ key + "With" ] = lists[ key ].fireWith;
		}

		// Handle state
		deferred.done( function() {
			state = "resolved";
		}, failList.disable, progressList.lock ).fail( function() {
			state = "rejected";
		}, doneList.disable, progressList.lock );

		// Call given func if any
		if ( func ) {
			func.call( deferred, deferred );
		}

		// All done!
		return deferred;
	};
jQuery.Event = function( src, props ) {

	// Allow instantiation without the 'new' keyword
	if ( !(this instanceof jQuery.Event) ) {
		return new jQuery.Event( src, props );
	}

	// Event object
	if ( src && src.type ) {
		this.originalEvent = src;
		this.type = src.type;

		// Events bubbling up the document may have been marked as prevented
		// by a handler lower down the tree; reflect the correct value.
		this.isDefaultPrevented = ( src.defaultPrevented || src.returnValue === false ||
			src.getPreventDefault && src.getPreventDefault() ) ? returnTrue : returnFalse;

	// Event type
	} else {
		this.type = src;
	}

	// Put explicitly provided properties onto the event object
	if ( props ) {
		jQuery.extend( this, props );
	}

	// Create a timestamp if incoming event doesn't have one
	this.timeStamp = src && src.timeStamp || jQuery.now();

	// Mark it as fixed
	this[ jQuery.expando ] = true;
};
jQuery._data = function( elem, name, data ) {

		return jQuery.data( elem, name, data, true );
	};
jQuery._mark = function( elem, type ) {

		if ( elem ) {
			type = ( type || "fx" ) + "mark";
			jQuery._data( elem, type, (jQuery._data( elem, type ) || 0) + 1 );
		}
	};
jQuery._unmark = function( force, elem, type ) {

		if ( force !== true ) {
			type = elem;
			elem = force;
			force = false;
		}
		if ( elem ) {
			type = type || "fx";
			var key = type + "mark",
				count = force ? 0 : ( (jQuery._data( elem, key ) || 1) - 1 );
			if ( count ) {
				jQuery._data( elem, key, count );
			} else {
				jQuery.removeData( elem, key, true );
				handleQueueMarkDefer( elem, type, "mark" );
			}
		}
	};
jQuery.acceptData = function( elem ) {

		if ( elem.nodeName ) {
			var match = jQuery.noData[ elem.nodeName.toLowerCase() ];

			if ( match ) {
				return !(match === true || elem.getAttribute("classid") !== match);
			}
		}

		return true;
	};
jQuery.access = function( elems, key, value, exec, fn, pass ) {

		var length = elems.length;

		// Setting many attributes
		if ( typeof key === "object" ) {
			for ( var k in key ) {
				jQuery.access( elems, k, key[k], exec, fn, value );
			}
			return elems;
		}

		// Setting one attribute
		if ( value !== undefined ) {
			// Optionally, function values get executed if exec is true
			exec = !pass && exec && jQuery.isFunction(value);

			for ( var i = 0; i < length; i++ ) {
				fn( elems[i], key, exec ? value.call( elems[i], i, fn( elems[i], key ) ) : value, pass );
			}

			return elems;
		}

		// Getting an attribute
		return length ? fn( elems[0], key ) : undefined;
	};
jQuery.active = 0;
jQuery.ajax = function( url, options ) {
/// <summary>
///     Perform an asynchronous HTTP (Ajax) request.
///     &#10;1 - jQuery.ajax(url, settings) 
///     &#10;2 - jQuery.ajax(settings)
/// </summary>
/// <param name="url" type="String">
///     A string containing the URL to which the request is sent.
/// </param>
/// <param name="options" type="Object">
///     A set of key/value pairs that configure the Ajax request. All settings are optional. A default can be set for any option with $.ajaxSetup(). See jQuery.ajax( settings ) below for a complete list of all settings.
/// </param>


		// If url is an object, simulate pre-1.5 signature
		if ( typeof url === "object" ) {
			options = url;
			url = undefined;
		}

		// Force options to be an object
		options = options || {};

		var // Create the final options object
			s = jQuery.ajaxSetup( {}, options ),
			// Callbacks context
			callbackContext = s.context || s,
			// Context for global events
			// It's the callbackContext if one was provided in the options
			// and if it's a DOM node or a jQuery collection
			globalEventContext = callbackContext !== s &&
				( callbackContext.nodeType || callbackContext instanceof jQuery ) ?
						jQuery( callbackContext ) : jQuery.event,
			// Deferreds
			deferred = jQuery.Deferred(),
			completeDeferred = jQuery.Callbacks( "once memory" ),
			// Status-dependent callbacks
			statusCode = s.statusCode || {},
			// ifModified key
			ifModifiedKey,
			// Headers (they are sent all at once)
			requestHeaders = {},
			requestHeadersNames = {},
			// Response headers
			responseHeadersString,
			responseHeaders,
			// transport
			transport,
			// timeout handle
			timeoutTimer,
			// Cross-domain detection vars
			parts,
			// The jqXHR state
			state = 0,
			// To know if global events are to be dispatched
			fireGlobals,
			// Loop variable
			i,
			// Fake xhr
			jqXHR = {

				readyState: 0,

				// Caches the header
				setRequestHeader: function( name, value ) {
					if ( !state ) {
						var lname = name.toLowerCase();
						name = requestHeadersNames[ lname ] = requestHeadersNames[ lname ] || name;
						requestHeaders[ name ] = value;
					}
					return this;
				},

				// Raw string
				getAllResponseHeaders: function() {
					return state === 2 ? responseHeadersString : null;
				},

				// Builds headers hashtable if needed
				getResponseHeader: function( key ) {
					var match;
					if ( state === 2 ) {
						if ( !responseHeaders ) {
							responseHeaders = {};
							while( ( match = rheaders.exec( responseHeadersString ) ) ) {
								responseHeaders[ match[1].toLowerCase() ] = match[ 2 ];
							}
						}
						match = responseHeaders[ key.toLowerCase() ];
					}
					return match === undefined ? null : match;
				},

				// Overrides response content-type header
				overrideMimeType: function( type ) {
					if ( !state ) {
						s.mimeType = type;
					}
					return this;
				},

				// Cancel the request
				abort: function( statusText ) {
					statusText = statusText || "abort";
					if ( transport ) {
						transport.abort( statusText );
					}
					done( 0, statusText );
					return this;
				}
			};

		// Callback for when everything is done
		// It is defined here because jslint complains if it is declared
		// at the end of the function (which would be more logical and readable)
		function done( status, nativeStatusText, responses, headers ) {

			// Called once
			if ( state === 2 ) {
				return;
			}

			// State is "done" now
			state = 2;

			// Clear timeout if it exists
			if ( timeoutTimer ) {
				clearTimeout( timeoutTimer );
			}

			// Dereference transport for early garbage collection
			// (no matter how long the jqXHR object will be used)
			transport = undefined;

			// Cache response headers
			responseHeadersString = headers || "";

			// Set readyState
			jqXHR.readyState = status > 0 ? 4 : 0;

			var isSuccess,
				success,
				error,
				statusText = nativeStatusText,
				response = responses ? ajaxHandleResponses( s, jqXHR, responses ) : undefined,
				lastModified,
				etag;

			// If successful, handle type chaining
			if ( status >= 200 && status < 300 || status === 304 ) {

				// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
				if ( s.ifModified ) {

					if ( ( lastModified = jqXHR.getResponseHeader( "Last-Modified" ) ) ) {
						jQuery.lastModified[ ifModifiedKey ] = lastModified;
					}
					if ( ( etag = jqXHR.getResponseHeader( "Etag" ) ) ) {
						jQuery.etag[ ifModifiedKey ] = etag;
					}
				}

				// If not modified
				if ( status === 304 ) {

					statusText = "notmodified";
					isSuccess = true;

				// If we have data
				} else {

					try {
						success = ajaxConvert( s, response );
						statusText = "success";
						isSuccess = true;
					} catch(e) {
						// We have a parsererror
						statusText = "parsererror";
						error = e;
					}
				}
			} else {
				// We extract error from statusText
				// then normalize statusText and status for non-aborts
				error = statusText;
				if ( !statusText || status ) {
					statusText = "error";
					if ( status < 0 ) {
						status = 0;
					}
				}
			}

			// Set data for the fake xhr object
			jqXHR.status = status;
			jqXHR.statusText = "" + ( nativeStatusText || statusText );

			// Success/Error
			if ( isSuccess ) {
				deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
			} else {
				deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
			}

			// Status-dependent callbacks
			jqXHR.statusCode( statusCode );
			statusCode = undefined;

			if ( fireGlobals ) {
				globalEventContext.trigger( "ajax" + ( isSuccess ? "Success" : "Error" ),
						[ jqXHR, s, isSuccess ? success : error ] );
			}

			// Complete
			completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );
				// Handle the global AJAX counter
				if ( !( --jQuery.active ) ) {
					jQuery.event.trigger( "ajaxStop" );
				}
			}
		}

		// Attach deferreds
		deferred.promise( jqXHR );
		jqXHR.success = jqXHR.done;
		jqXHR.error = jqXHR.fail;
		jqXHR.complete = completeDeferred.add;

		// Status-dependent callbacks
		jqXHR.statusCode = function( map ) {
			if ( map ) {
				var tmp;
				if ( state < 2 ) {
					for ( tmp in map ) {
						statusCode[ tmp ] = [ statusCode[tmp], map[tmp] ];
					}
				} else {
					tmp = map[ jqXHR.status ];
					jqXHR.then( tmp, tmp );
				}
			}
			return this;
		};

		// Remove hash character (#7531: and string promotion)
		// Add protocol if not provided (#5866: IE7 issue with protocol-less urls)
		// We also use the url parameter if available
		s.url = ( ( url || s.url ) + "" ).replace( rhash, "" ).replace( rprotocol, ajaxLocParts[ 1 ] + "//" );

		// Extract dataTypes list
		s.dataTypes = jQuery.trim( s.dataType || "*" ).toLowerCase().split( rspacesAjax );

		// Determine if a cross-domain request is in order
		if ( s.crossDomain == null ) {
			parts = rurl.exec( s.url.toLowerCase() );
			s.crossDomain = !!( parts &&
				( parts[ 1 ] != ajaxLocParts[ 1 ] || parts[ 2 ] != ajaxLocParts[ 2 ] ||
					( parts[ 3 ] || ( parts[ 1 ] === "http:" ? 80 : 443 ) ) !=
						( ajaxLocParts[ 3 ] || ( ajaxLocParts[ 1 ] === "http:" ? 80 : 443 ) ) )
			);
		}

		// Convert data if not already a string
		if ( s.data && s.processData && typeof s.data !== "string" ) {
			s.data = jQuery.param( s.data, s.traditional );
		}

		// Apply prefilters
		inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

		// If request was aborted inside a prefiler, stop there
		if ( state === 2 ) {
			return false;
		}

		// We can fire global events as of now if asked to
		fireGlobals = s.global;

		// Uppercase the type
		s.type = s.type.toUpperCase();

		// Determine if request has content
		s.hasContent = !rnoContent.test( s.type );

		// Watch for a new set of requests
		if ( fireGlobals && jQuery.active++ === 0 ) {
			jQuery.event.trigger( "ajaxStart" );
		}

		// More options handling for requests with no content
		if ( !s.hasContent ) {

			// If data is available, append data to url
			if ( s.data ) {
				s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.data;
				// #9682: remove data so that it's not used in an eventual retry
				delete s.data;
			}

			// Get ifModifiedKey before adding the anti-cache parameter
			ifModifiedKey = s.url;

			// Add anti-cache in url if needed
			if ( s.cache === false ) {

				var ts = jQuery.now(),
					// try replacing _= if it is there
					ret = s.url.replace( rts, "$1_=" + ts );

				// if nothing was replaced, add timestamp to the end
				s.url = ret + ( ( ret === s.url ) ? ( rquery.test( s.url ) ? "&" : "?" ) + "_=" + ts : "" );
			}
		}

		// Set the correct header, if data is being sent
		if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
			jqXHR.setRequestHeader( "Content-Type", s.contentType );
		}

		// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
		if ( s.ifModified ) {
			ifModifiedKey = ifModifiedKey || s.url;
			if ( jQuery.lastModified[ ifModifiedKey ] ) {
				jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ ifModifiedKey ] );
			}
			if ( jQuery.etag[ ifModifiedKey ] ) {
				jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ ifModifiedKey ] );
			}
		}

		// Set the Accepts header for the server, depending on the dataType
		jqXHR.setRequestHeader(
			"Accept",
			s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[0] ] ?
				s.accepts[ s.dataTypes[0] ] + ( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
				s.accepts[ "*" ]
		);

		// Check for headers option
		for ( i in s.headers ) {
			jqXHR.setRequestHeader( i, s.headers[ i ] );
		}

		// Allow custom headers/mimetypes and early abort
		if ( s.beforeSend && ( s.beforeSend.call( callbackContext, jqXHR, s ) === false || state === 2 ) ) {
				// Abort if not done already
				jqXHR.abort();
				return false;

		}

		// Install callbacks on deferreds
		for ( i in { success: 1, error: 1, complete: 1 } ) {
			jqXHR[ i ]( s[ i ] );
		}

		// Get transport
		transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

		// If no transport, we auto-abort
		if ( !transport ) {
			done( -1, "No Transport" );
		} else {
			jqXHR.readyState = 1;
			// Send global event
			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
			}
			// Timeout
			if ( s.async && s.timeout > 0 ) {
				timeoutTimer = setTimeout( function(){
					jqXHR.abort( "timeout" );
				}, s.timeout );
			}

			try {
				state = 1;
				transport.send( requestHeaders, done );
			} catch (e) {
				// Propagate exception as error if not done
				if ( state < 2 ) {
					done( -1, e );
				// Simply rethrow otherwise
				} else {
					throw e;
				}
			}
		}

		return jqXHR;
	};
jQuery.ajaxPrefilter = function( dataTypeExpression, func ) {
/// <summary>
///     Handle custom Ajax options or modify existing options before each request is sent and before they are processed by $.ajax().
/// </summary>
/// <param name="dataTypeExpression" type="String">
///     An optional string containing one or more space-separated dataTypes
/// </param>
/// <param name="func" type="Function">
///     A handler to set default values for future Ajax requests.
/// </param>
/// <returns type="undefined" />


		if ( typeof dataTypeExpression !== "string" ) {
			func = dataTypeExpression;
			dataTypeExpression = "*";
		}

		if ( jQuery.isFunction( func ) ) {
			var dataTypes = dataTypeExpression.toLowerCase().split( rspacesAjax ),
				i = 0,
				length = dataTypes.length,
				dataType,
				list,
				placeBefore;

			// For each dataType in the dataTypeExpression
			for ( ; i < length; i++ ) {
				dataType = dataTypes[ i ];
				// We control if we're asked to add before
				// any existing element
				placeBefore = /^\+/.test( dataType );
				if ( placeBefore ) {
					dataType = dataType.substr( 1 ) || "*";
				}
				list = structure[ dataType ] = structure[ dataType ] || [];
				// then we add to the structure accordingly
				list[ placeBefore ? "unshift" : "push" ]( func );
			}
		}
	};
jQuery.ajaxSettings = { "url": 'http://localhost:25813/',
"isLocal": false,
"global": true,
"type": 'GET',
"contentType": 'application/x-www-form-urlencoded',
"processData": true,
"async": true,
"accepts": {},
"contents": {},
"responseFields": {},
"converters": {},
"flatOptions": {},
"jsonp": 'callback' };
jQuery.ajaxSetup = function( target, settings ) {
/// <summary>
///     Set default values for future Ajax requests.
/// </summary>
/// <param name="target" type="Object">
///     A set of key/value pairs that configure the default Ajax request. All options are optional.
/// </param>

		if ( settings ) {
			// Building a settings object
			ajaxExtend( target, jQuery.ajaxSettings );
		} else {
			// Extending ajaxSettings
			settings = target;
			target = jQuery.ajaxSettings;
		}
		ajaxExtend( target, settings );
		return target;
	};
jQuery.ajaxTransport = function( dataTypeExpression, func ) {


		if ( typeof dataTypeExpression !== "string" ) {
			func = dataTypeExpression;
			dataTypeExpression = "*";
		}

		if ( jQuery.isFunction( func ) ) {
			var dataTypes = dataTypeExpression.toLowerCase().split( rspacesAjax ),
				i = 0,
				length = dataTypes.length,
				dataType,
				list,
				placeBefore;

			// For each dataType in the dataTypeExpression
			for ( ; i < length; i++ ) {
				dataType = dataTypes[ i ];
				// We control if we're asked to add before
				// any existing element
				placeBefore = /^\+/.test( dataType );
				if ( placeBefore ) {
					dataType = dataType.substr( 1 ) || "*";
				}
				list = structure[ dataType ] = structure[ dataType ] || [];
				// then we add to the structure accordingly
				list[ placeBefore ? "unshift" : "push" ]( func );
			}
		}
	};
jQuery.attr = function( elem, name, value, pass ) {

		var ret, hooks, notxml,
			nType = elem.nodeType;

		// don't get/set attributes on text, comment and attribute nodes
		if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		if ( pass && name in jQuery.attrFn ) {
			return jQuery( elem )[ name ]( value );
		}

		// Fallback to prop when attributes are not supported
		if ( typeof elem.getAttribute === "undefined" ) {
			return jQuery.prop( elem, name, value );
		}

		notxml = nType !== 1 || !jQuery.isXMLDoc( elem );

		// All attributes are lowercase
		// Grab necessary hook if one is defined
		if ( notxml ) {
			name = name.toLowerCase();
			hooks = jQuery.attrHooks[ name ] || ( rboolean.test( name ) ? boolHook : nodeHook );
		}

		if ( value !== undefined ) {

			if ( value === null ) {
				jQuery.removeAttr( elem, name );
				return;

			} else if ( hooks && "set" in hooks && notxml && (ret = hooks.set( elem, value, name )) !== undefined ) {
				return ret;

			} else {
				elem.setAttribute( name, "" + value );
				return value;
			}

		} else if ( hooks && "get" in hooks && notxml && (ret = hooks.get( elem, name )) !== null ) {
			return ret;

		} else {

			ret = elem.getAttribute( name );

			// Non-existent attributes return null, we normalize to undefined
			return ret === null ?
				undefined :
				ret;
		}
	};
jQuery.attrFn = { "val": true,
"css": true,
"html": true,
"text": true,
"data": true,
"width": true,
"height": true,
"offset": true,
"blur": true,
"focus": true,
"focusin": true,
"focusout": true,
"load": true,
"resize": true,
"scroll": true,
"unload": true,
"click": true,
"dblclick": true,
"mousedown": true,
"mouseup": true,
"mousemove": true,
"mouseover": true,
"mouseout": true,
"mouseenter": true,
"mouseleave": true,
"change": true,
"select": true,
"submit": true,
"keydown": true,
"keypress": true,
"keyup": true,
"error": true,
"contextmenu": true };
jQuery.attrHooks = { "type": {},
"value": {},
"tabindex": {} };
jQuery.bindReady = function() {

		if ( readyList ) {
			return;
		}

		readyList = jQuery.Callbacks( "once memory" );

		// Catch cases where $(document).ready() is called after the
		// browser event has already occurred.
		if ( document.readyState === "complete" ) {
			// Handle it asynchronously to allow scripts the opportunity to delay ready
			return setTimeout( jQuery.ready, 1 );
		}

		// Mozilla, Opera and webkit nightlies currently support this event
		if ( document.addEventListener ) {
			// Use the handy event callback
			document.addEventListener( "DOMContentLoaded", DOMContentLoaded, false );

			// A fallback to window.onload, that will always work
			window.addEventListener( "load", jQuery.ready, false );

		// If IE event model is used
		} else if ( document.attachEvent ) {
			// ensure firing before onload,
			// maybe late but safe also for iframes
			document.attachEvent( "onreadystatechange", DOMContentLoaded );

			// A fallback to window.onload, that will always work
			window.attachEvent( "onload", jQuery.ready );

			// If IE and not a frame
			// continually check to see if the document is ready
			var toplevel = false;

			try {
				toplevel = window.frameElement == null;
			} catch(e) {}

			if ( document.documentElement.doScroll && toplevel ) {
				doScrollCheck();
			}
		}
	};
jQuery.boxModel = true;
jQuery.browser = { "msie": true,
"version": '9.0' };
jQuery.buildFragment = function( args, nodes, scripts ) {

	var fragment, cacheable, cacheresults, doc,
	first = args[ 0 ];

	// nodes may contain either an explicit document object,
	// a jQuery collection or context object.
	// If nodes[0] contains a valid object to assign to doc
	if ( nodes && nodes[0] ) {
		doc = nodes[0].ownerDocument || nodes[0];
	}

	// Ensure that an attr object doesn't incorrectly stand in as a document object
	// Chrome and Firefox seem to allow this to occur and will throw exception
	// Fixes #8950
	if ( !doc.createDocumentFragment ) {
		doc = document;
	}

	// Only cache "small" (1/2 KB) HTML strings that are associated with the main document
	// Cloning options loses the selected state, so don't cache them
	// IE 6 doesn't like it when you put <object> or <embed> elements in a fragment
	// Also, WebKit does not clone 'checked' attributes on cloneNode, so don't cache
	// Lastly, IE6,7,8 will not correctly reuse cached fragments that were created from unknown elems #10501
	if ( args.length === 1 && typeof first === "string" && first.length < 512 && doc === document &&
		first.charAt(0) === "<" && !rnocache.test( first ) &&
		(jQuery.support.checkClone || !rchecked.test( first )) &&
		(jQuery.support.html5Clone || !rnoshimcache.test( first )) ) {

		cacheable = true;

		cacheresults = jQuery.fragments[ first ];
		if ( cacheresults && cacheresults !== 1 ) {
			fragment = cacheresults;
		}
	}

	if ( !fragment ) {
		fragment = doc.createDocumentFragment();
		jQuery.clean( args, doc, fragment, scripts );
	}

	if ( cacheable ) {
		jQuery.fragments[ first ] = cacheresults ? fragment : 1;
	}

	return { fragment: fragment, cacheable: cacheable };
};
jQuery.cache = {};
jQuery.camelCase = function( string ) {

		return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
	};
jQuery.clean = function( elems, context, fragment, scripts ) {

		var checkScriptType;

		context = context || document;

		// !context.createElement fails in IE with an error but returns typeof 'object'
		if ( typeof context.createElement === "undefined" ) {
			context = context.ownerDocument || context[0] && context[0].ownerDocument || document;
		}

		var ret = [], j;

		for ( var i = 0, elem; (elem = elems[i]) != null; i++ ) {
			if ( typeof elem === "number" ) {
				elem += "";
			}

			if ( !elem ) {
				continue;
			}

			// Convert html string into DOM nodes
			if ( typeof elem === "string" ) {
				if ( !rhtml.test( elem ) ) {
					elem = context.createTextNode( elem );
				} else {
					// Fix "XHTML"-style tags in all browsers
					elem = elem.replace(rxhtmlTag, "<$1></$2>");

					// Trim whitespace, otherwise indexOf won't work as expected
					var tag = ( rtagName.exec( elem ) || ["", ""] )[1].toLowerCase(),
						wrap = wrapMap[ tag ] || wrapMap._default,
						depth = wrap[0],
						div = context.createElement("div");

					// Append wrapper element to unknown element safe doc fragment
					if ( context === document ) {
						// Use the fragment we've already created for this document
						safeFragment.appendChild( div );
					} else {
						// Use a fragment created with the owner document
						createSafeFragment( context ).appendChild( div );
					}

					// Go to html and back, then peel off extra wrappers
					div.innerHTML = wrap[1] + elem + wrap[2];

					// Move to the right depth
					while ( depth-- ) {
						div = div.lastChild;
					}

					// Remove IE's autoinserted <tbody> from table fragments
					if ( !jQuery.support.tbody ) {

						// String was a <table>, *may* have spurious <tbody>
						var hasBody = rtbody.test(elem),
							tbody = tag === "table" && !hasBody ?
								div.firstChild && div.firstChild.childNodes :

								// String was a bare <thead> or <tfoot>
								wrap[1] === "<table>" && !hasBody ?
									div.childNodes :
									[];

						for ( j = tbody.length - 1; j >= 0 ; --j ) {
							if ( jQuery.nodeName( tbody[ j ], "tbody" ) && !tbody[ j ].childNodes.length ) {
								tbody[ j ].parentNode.removeChild( tbody[ j ] );
							}
						}
					}

					// IE completely kills leading whitespace when innerHTML is used
					if ( !jQuery.support.leadingWhitespace && rleadingWhitespace.test( elem ) ) {
						div.insertBefore( context.createTextNode( rleadingWhitespace.exec(elem)[0] ), div.firstChild );
					}

					elem = div.childNodes;
				}
			}

			// Resets defaultChecked for any radios and checkboxes
			// about to be appended to the DOM in IE 6/7 (#8060)
			var len;
			if ( !jQuery.support.appendChecked ) {
				if ( elem[0] && typeof (len = elem.length) === "number" ) {
					for ( j = 0; j < len; j++ ) {
						findInputs( elem[j] );
					}
				} else {
					findInputs( elem );
				}
			}

			if ( elem.nodeType ) {
				ret.push( elem );
			} else {
				ret = jQuery.merge( ret, elem );
			}
		}

		if ( fragment ) {
			checkScriptType = function( elem ) {
				return !elem.type || rscriptType.test( elem.type );
			};
			for ( i = 0; ret[i]; i++ ) {
				if ( scripts && jQuery.nodeName( ret[i], "script" ) && (!ret[i].type || ret[i].type.toLowerCase() === "text/javascript") ) {
					scripts.push( ret[i].parentNode ? ret[i].parentNode.removeChild( ret[i] ) : ret[i] );

				} else {
					if ( ret[i].nodeType === 1 ) {
						var jsTags = jQuery.grep( ret[i].getElementsByTagName( "script" ), checkScriptType );

						ret.splice.apply( ret, [i + 1, 0].concat( jsTags ) );
					}
					fragment.appendChild( ret[i] );
				}
			}
		}

		return ret;
	};
jQuery.cleanData = function( elems ) {

		var data, id,
			cache = jQuery.cache,
			special = jQuery.event.special,
			deleteExpando = jQuery.support.deleteExpando;

		for ( var i = 0, elem; (elem = elems[i]) != null; i++ ) {
			if ( elem.nodeName && jQuery.noData[elem.nodeName.toLowerCase()] ) {
				continue;
			}

			id = elem[ jQuery.expando ];

			if ( id ) {
				data = cache[ id ];

				if ( data && data.events ) {
					for ( var type in data.events ) {
						if ( special[ type ] ) {
							jQuery.event.remove( elem, type );

						// This is a shortcut to avoid jQuery.event.remove's overhead
						} else {
							jQuery.removeEvent( elem, type, data.handle );
						}
					}

					// Null the DOM reference to avoid IE6/7/8 leak (#7054)
					if ( data.handle ) {
						data.handle.elem = null;
					}
				}

				if ( deleteExpando ) {
					delete elem[ jQuery.expando ];

				} else if ( elem.removeAttribute ) {
					elem.removeAttribute( jQuery.expando );
				}

				delete cache[ id ];
			}
		}
	};
jQuery.clone = function( elem, dataAndEvents, deepDataAndEvents ) {

		var srcElements,
			destElements,
			i,
			// IE<=8 does not properly clone detached, unknown element nodes
			clone = jQuery.support.html5Clone || !rnoshimcache.test( "<" + elem.nodeName ) ?
				elem.cloneNode( true ) :
				shimCloneNode( elem );

		if ( (!jQuery.support.noCloneEvent || !jQuery.support.noCloneChecked) &&
				(elem.nodeType === 1 || elem.nodeType === 11) && !jQuery.isXMLDoc(elem) ) {
			// IE copies events bound via attachEvent when using cloneNode.
			// Calling detachEvent on the clone will also remove the events
			// from the original. In order to get around this, we use some
			// proprietary methods to clear the events. Thanks to MooTools
			// guys for this hotness.

			cloneFixAttributes( elem, clone );

			// Using Sizzle here is crazy slow, so we use getElementsByTagName instead
			srcElements = getAll( elem );
			destElements = getAll( clone );

			// Weird iteration because IE will replace the length property
			// with an element if you are cloning the body and one of the
			// elements on the page has a name or id of "length"
			for ( i = 0; srcElements[i]; ++i ) {
				// Ensure that the destination node is not null; Fixes #9587
				if ( destElements[i] ) {
					cloneFixAttributes( srcElements[i], destElements[i] );
				}
			}
		}

		// Copy the events from the original to the clone
		if ( dataAndEvents ) {
			cloneCopyEvent( elem, clone );

			if ( deepDataAndEvents ) {
				srcElements = getAll( elem );
				destElements = getAll( clone );

				for ( i = 0; srcElements[i]; ++i ) {
					cloneCopyEvent( srcElements[i], destElements[i] );
				}
			}
		}

		srcElements = destElements = null;

		// Return the cloned set
		return clone;
	};
jQuery.contains = function( a, b ) {
/// <summary>
///     Check to see if a DOM element is within another DOM element.
/// </summary>
/// <param name="a" domElement="true">
///     The DOM element that may contain the other element.
/// </param>
/// <param name="b" domElement="true">
///     The DOM element that may be contained by the other element.
/// </param>
/// <returns type="Boolean" />

		return a !== b && (a.contains ? a.contains(b) : true);
	};
jQuery.css = function( elem, name, extra ) {

		var ret, hooks;

		// Make sure that we're working with the right name
		name = jQuery.camelCase( name );
		hooks = jQuery.cssHooks[ name ];
		name = jQuery.cssProps[ name ] || name;

		// cssFloat needs a special treatment
		if ( name === "cssFloat" ) {
			name = "float";
		}

		// If a hook was provided get the computed value from there
		if ( hooks && "get" in hooks && (ret = hooks.get( elem, true, extra )) !== undefined ) {
			return ret;

		// Otherwise, if a way to get the computed value exists, use that
		} else if ( curCSS ) {
			return curCSS( elem, name );
		}
	};
jQuery.cssHooks = { "opacity": {},
"height": {},
"width": {} };
jQuery.cssNumber = { "fillOpacity": true,
"fontWeight": true,
"lineHeight": true,
"opacity": true,
"orphans": true,
"widows": true,
"zIndex": true,
"zoom": true };
jQuery.cssProps = { "float": 'cssFloat' };
jQuery.curCSS = function( elem, name, extra ) {

		var ret, hooks;

		// Make sure that we're working with the right name
		name = jQuery.camelCase( name );
		hooks = jQuery.cssHooks[ name ];
		name = jQuery.cssProps[ name ] || name;

		// cssFloat needs a special treatment
		if ( name === "cssFloat" ) {
			name = "float";
		}

		// If a hook was provided get the computed value from there
		if ( hooks && "get" in hooks && (ret = hooks.get( elem, true, extra )) !== undefined ) {
			return ret;

		// Otherwise, if a way to get the computed value exists, use that
		} else if ( curCSS ) {
			return curCSS( elem, name );
		}
	};
jQuery.data = function( elem, name, data, pvt /* Internal Use Only */ ) {
/// <summary>
///     1: Store arbitrary data associated with the specified element. Returns the value that was set.
///     &#10;    1.1 - jQuery.data(element, key, value)
///     &#10;2: Returns value at named data store for the element, as set by jQuery.data(element, name, value), or the full data store for the element.
///     &#10;    2.1 - jQuery.data(element, key) 
///     &#10;    2.2 - jQuery.data(element)
/// </summary>
/// <param name="elem" domElement="true">
///     The DOM element to associate with the data.
/// </param>
/// <param name="name" type="String">
///     A string naming the piece of data to set.
/// </param>
/// <param name="data" type="Object">
///     The new data value.
/// </param>
/// <returns type="Object" />

		if ( !jQuery.acceptData( elem ) ) {
			return;
		}

		var privateCache, thisCache, ret,
			internalKey = jQuery.expando,
			getByName = typeof name === "string",

			// We have to handle DOM nodes and JS objects differently because IE6-7
			// can't GC object references properly across the DOM-JS boundary
			isNode = elem.nodeType,

			// Only DOM nodes need the global jQuery cache; JS object data is
			// attached directly to the object so GC can occur automatically
			cache = isNode ? jQuery.cache : elem,

			// Only defining an ID for JS objects if its cache already exists allows
			// the code to shortcut on the same path as a DOM node with no cache
			id = isNode ? elem[ internalKey ] : elem[ internalKey ] && internalKey,
			isEvents = name === "events";

		// Avoid doing any more work than we need to when trying to get data on an
		// object that has no data at all
		if ( (!id || !cache[id] || (!isEvents && !pvt && !cache[id].data)) && getByName && data === undefined ) {
			return;
		}

		if ( !id ) {
			// Only DOM nodes need a new unique ID for each element since their data
			// ends up in the global cache
			if ( isNode ) {
				elem[ internalKey ] = id = ++jQuery.uuid;
			} else {
				id = internalKey;
			}
		}

		if ( !cache[ id ] ) {
			cache[ id ] = {};

			// Avoids exposing jQuery metadata on plain JS objects when the object
			// is serialized using JSON.stringify
			if ( !isNode ) {
				cache[ id ].toJSON = jQuery.noop;
			}
		}

		// An object can be passed to jQuery.data instead of a key/value pair; this gets
		// shallow copied over onto the existing cache
		if ( typeof name === "object" || typeof name === "function" ) {
			if ( pvt ) {
				cache[ id ] = jQuery.extend( cache[ id ], name );
			} else {
				cache[ id ].data = jQuery.extend( cache[ id ].data, name );
			}
		}

		privateCache = thisCache = cache[ id ];

		// jQuery data() is stored in a separate object inside the object's internal data
		// cache in order to avoid key collisions between internal data and user-defined
		// data.
		if ( !pvt ) {
			if ( !thisCache.data ) {
				thisCache.data = {};
			}

			thisCache = thisCache.data;
		}

		if ( data !== undefined ) {
			thisCache[ jQuery.camelCase( name ) ] = data;
		}

		// Users should not attempt to inspect the internal events object using jQuery.data,
		// it is undocumented and subject to change. But does anyone listen? No.
		if ( isEvents && !thisCache[ name ] ) {
			return privateCache.events;
		}

		// Check for both converted-to-camel and non-converted data property names
		// If a data property was specified
		if ( getByName ) {

			// First Try to find as-is property data
			ret = thisCache[ name ];

			// Test for null|undefined property data
			if ( ret == null ) {

				// Try to find the camelCased property
				ret = thisCache[ jQuery.camelCase( name ) ];
			}
		} else {
			ret = thisCache;
		}

		return ret;
	};
jQuery.dequeue = function( elem, type ) {
/// <summary>
///     Execute the next function on the queue for the matched element.
/// </summary>
/// <param name="elem" domElement="true">
///     A DOM element from which to remove and execute a queued function.
/// </param>
/// <param name="type" type="String">
///     A string containing the name of the queue. Defaults to fx, the standard effects queue.
/// </param>
/// <returns type="jQuery" />

		type = type || "fx";

		var queue = jQuery.queue( elem, type ),
			fn = queue.shift(),
			hooks = {};

		// If the fx queue is dequeued, always remove the progress sentinel
		if ( fn === "inprogress" ) {
			fn = queue.shift();
		}

		if ( fn ) {
			// Add a progress sentinel to prevent the fx queue from being
			// automatically dequeued
			if ( type === "fx" ) {
				queue.unshift( "inprogress" );
			}

			jQuery._data( elem, type + ".run", hooks );
			fn.call( elem, function() {
				jQuery.dequeue( elem, type );
			}, hooks );
		}

		if ( !queue.length ) {
			jQuery.removeData( elem, type + "queue " + type + ".run", true );
			handleQueueMarkDefer( elem, type, "queue" );
		}
	};
jQuery.dir = function( elem, dir, until ) {

		var matched = [],
			cur = elem[ dir ];

		while ( cur && cur.nodeType !== 9 && (until === undefined || cur.nodeType !== 1 || !jQuery( cur ).is( until )) ) {
			if ( cur.nodeType === 1 ) {
				matched.push( cur );
			}
			cur = cur[dir];
		}
		return matched;
	};
jQuery.each = function( object, callback, args ) {
/// <summary>
///     A generic iterator function, which can be used to seamlessly iterate over both objects and arrays. Arrays and array-like objects with a length property (such as a function's arguments object) are iterated by numeric index, from 0 to length-1. Other objects are iterated via their named properties.
/// </summary>
/// <param name="object" type="Object">
///     The object or array to iterate over.
/// </param>
/// <param name="callback" type="Function">
///     The function that will be executed on every object.
/// </param>
/// <returns type="Object" />

		var name, i = 0,
			length = object.length,
			isObj = length === undefined || jQuery.isFunction( object );

		if ( args ) {
			if ( isObj ) {
				for ( name in object ) {
					if ( callback.apply( object[ name ], args ) === false ) {
						break;
					}
				}
			} else {
				for ( ; i < length; ) {
					if ( callback.apply( object[ i++ ], args ) === false ) {
						break;
					}
				}
			}

		// A special, fast, case for the most common use of each
		} else {
			if ( isObj ) {
				for ( name in object ) {
					if ( callback.call( object[ name ], name, object[ name ] ) === false ) {
						break;
					}
				}
			} else {
				for ( ; i < length; ) {
					if ( callback.call( object[ i ], i, object[ i++ ] ) === false ) {
						break;
					}
				}
			}
		}

		return object;
	};
jQuery.easing = {};
jQuery.error = function( msg ) {
/// <summary>
///     Takes a string and throws an exception containing it.
/// </summary>
/// <param name="msg" type="String">
///     The message to send out.
/// </param>

		throw new Error( msg );
	};
jQuery.etag = {};
jQuery.event = { "global": {},
"customEvent": {},
"props": ['attrChange','attrName','relatedNode','srcElement','altKey','bubbles','cancelable','ctrlKey','currentTarget','eventPhase','metaKey','relatedTarget','shiftKey','target','timeStamp','view','which'],
"fixHooks": {},
"keyHooks": {},
"mouseHooks": {},
"special": {},
"triggered": false };
jQuery.expr = { "order": ['ID','CLASS','NAME','TAG'],
"match": {},
"leftMatch": {},
"attrMap": {},
"attrHandle": {},
"relative": {},
"find": {},
"preFilter": {},
"filters": {},
"setFilters": {},
"filter": {},
":": {} };
jQuery.extend = function() {
/// <summary>
///     Merge the contents of two or more objects together into the first object.
///     &#10;1 - jQuery.extend(target, object1, objectN) 
///     &#10;2 - jQuery.extend(deep, target, object1, objectN)
/// </summary>
/// <param name="" type="Boolean">
///     If true, the merge becomes recursive (aka. deep copy).
/// </param>
/// <param name="" type="Object">
///     The object to extend. It will receive the new properties.
/// </param>
/// <param name="" type="Object">
///     An object containing additional properties to merge in.
/// </param>
/// <param name="" type="Object">
///     Additional objects containing properties to merge in.
/// </param>
/// <returns type="Object" />

	var options, name, src, copy, copyIsArray, clone,
		target = arguments[0] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;
		target = arguments[1] || {};
		// skip the boolean and the target
		i = 2;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !jQuery.isFunction(target) ) {
		target = {};
	}

	// extend jQuery itself if only one argument is passed
	if ( length === i ) {
		target = this;
		--i;
	}

	for ( ; i < length; i++ ) {
		// Only deal with non-null/undefined values
		if ( (options = arguments[ i ]) != null ) {
			// Extend the base object
			for ( name in options ) {
				src = target[ name ];
				copy = options[ name ];

				// Prevent never-ending loop
				if ( target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)) ) ) {
					if ( copyIsArray ) {
						copyIsArray = false;
						clone = src && jQuery.isArray(src) ? src : [];

					} else {
						clone = src && jQuery.isPlainObject(src) ? src : {};
					}

					// Never move original objects, clone them
					target[ name ] = jQuery.extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};
jQuery.filter = function( expr, elems, not ) {

		if ( not ) {
			expr = ":not(" + expr + ")";
		}

		return elems.length === 1 ?
			jQuery.find.matchesSelector(elems[0], expr) ? [ elems[0] ] : [] :
			jQuery.find.matches(expr, elems);
	};
jQuery.find = function( query, context, extra, seed ) {

			context = context || document;

			// Only use querySelectorAll on non-XML documents
			// (ID selectors don't work in non-HTML documents)
			if ( !seed && !Sizzle.isXML(context) ) {
				// See if we find a selector to speed up
				var match = /^(\w+$)|^\.([\w\-]+$)|^#([\w\-]+$)/.exec( query );
				
				if ( match && (context.nodeType === 1 || context.nodeType === 9) ) {
					// Speed-up: Sizzle("TAG")
					if ( match[1] ) {
						return makeArray( context.getElementsByTagName( query ), extra );
					
					// Speed-up: Sizzle(".CLASS")
					} else if ( match[2] && Expr.find.CLASS && context.getElementsByClassName ) {
						return makeArray( context.getElementsByClassName( match[2] ), extra );
					}
				}
				
				if ( context.nodeType === 9 ) {
					// Speed-up: Sizzle("body")
					// The body element only exists once, optimize finding it
					if ( query === "body" && context.body ) {
						return makeArray( [ context.body ], extra );
						
					// Speed-up: Sizzle("#ID")
					} else if ( match && match[3] ) {
						var elem = context.getElementById( match[3] );

						// Check parentNode to catch when Blackberry 4.6 returns
						// nodes that are no longer in the document #6963
						if ( elem && elem.parentNode ) {
							// Handle the case where IE and Opera return items
							// by name instead of ID
							if ( elem.id === match[3] ) {
								return makeArray( [ elem ], extra );
							}
							
						} else {
							return makeArray( [], extra );
						}
					}
					
					try {
						return makeArray( context.querySelectorAll(query), extra );
					} catch(qsaError) {}

				// qSA works strangely on Element-rooted queries
				// We can work around this by specifying an extra ID on the root
				// and working up from there (Thanks to Andrew Dupont for the technique)
				// IE 8 doesn't work on object elements
				} else if ( context.nodeType === 1 && context.nodeName.toLowerCase() !== "object" ) {
					var oldContext = context,
						old = context.getAttribute( "id" ),
						nid = old || id,
						hasParent = context.parentNode,
						relativeHierarchySelector = /^\s*[+~]/.test( query );

					if ( !old ) {
						context.setAttribute( "id", nid );
					} else {
						nid = nid.replace( /'/g, "\\$&" );
					}
					if ( relativeHierarchySelector && hasParent ) {
						context = context.parentNode;
					}

					try {
						if ( !relativeHierarchySelector || hasParent ) {
							return makeArray( context.querySelectorAll( "[id='" + nid + "'] " + query ), extra );
						}

					} catch(pseudoError) {
					} finally {
						if ( !old ) {
							oldContext.removeAttribute( "id" );
						}
					}
				}
			}
		
			return oldSizzle(query, context, extra, seed);
		};
jQuery.fn = { "selector": '',
"jquery": '1.7.1',
"length": 0 };
jQuery.fragments = {};
jQuery.fx = function( elem, options, prop ) {

		this.options = options;
		this.elem = elem;
		this.prop = prop;

		options.orig = options.orig || {};
	};
jQuery.get = function( url, data, callback, type ) {
/// <summary>
///     Load data from the server using a HTTP GET request.
/// </summary>
/// <param name="url" type="String">
///     A string containing the URL to which the request is sent.
/// </param>
/// <param name="data" type="String">
///     A map or string that is sent to the server with the request.
/// </param>
/// <param name="callback" type="Function">
///     A callback function that is executed if the request succeeds.
/// </param>
/// <param name="type" type="String">
///     The type of data expected from the server. Default: Intelligent Guess (xml, json, script, or html).
/// </param>

		// shift arguments if data argument was omitted
		if ( jQuery.isFunction( data ) ) {
			type = type || callback;
			callback = data;
			data = undefined;
		}

		return jQuery.ajax({
			type: method,
			url: url,
			data: data,
			success: callback,
			dataType: type
		});
	};
jQuery.getJSON = function( url, data, callback ) {
/// <summary>
///     Load JSON-encoded data from the server using a GET HTTP request.
/// </summary>
/// <param name="url" type="String">
///     A string containing the URL to which the request is sent.
/// </param>
/// <param name="data" type="Object">
///     A map or string that is sent to the server with the request.
/// </param>
/// <param name="callback" type="Function">
///     A callback function that is executed if the request succeeds.
/// </param>

		return jQuery.get( url, data, callback, "json" );
	};
jQuery.getScript = function( url, callback ) {
/// <summary>
///     Load a JavaScript file from the server using a GET HTTP request, then execute it.
/// </summary>
/// <param name="url" type="String">
///     A string containing the URL to which the request is sent.
/// </param>
/// <param name="callback" type="Function">
///     A callback function that is executed if the request succeeds.
/// </param>

		return jQuery.get( url, undefined, callback, "script" );
	};
jQuery.globalEval = function( data ) {
/// <summary>
///     Execute some JavaScript code globally.
/// </summary>
/// <param name="data" type="String">
///     The JavaScript code to execute.
/// </param>

		if ( data && rnotwhite.test( data ) ) {
			// We use execScript on Internet Explorer
			// We use an anonymous function so that context is window
			// rather than jQuery in Firefox
			( window.execScript || function( data ) {
				window[ "eval" ].call( window, data );
			} )( data );
		}
	};
jQuery.grep = function( elems, callback, inv ) {
/// <summary>
///     Finds the elements of an array which satisfy a filter function. The original array is not affected.
/// </summary>
/// <param name="elems" type="Array">
///     The array to search through.
/// </param>
/// <param name="callback" type="Function">
///     The function to process each item against.  The first argument to the function is the item, and the second argument is the index.  The function should return a Boolean value.  this will be the global window object.
/// </param>
/// <param name="inv" type="Boolean">
///     If "invert" is false, or not provided, then the function returns an array consisting of all elements for which "callback" returns true.  If "invert" is true, then the function returns an array consisting of all elements for which "callback" returns false.
/// </param>
/// <returns type="Array" />

		var ret = [], retVal;
		inv = !!inv;

		// Go through the array, only saving the items
		// that pass the validator function
		for ( var i = 0, length = elems.length; i < length; i++ ) {
			retVal = !!callback( elems[ i ], i );
			if ( inv !== retVal ) {
				ret.push( elems[ i ] );
			}
		}

		return ret;
	};
jQuery.guid = 1;
jQuery.hasData = function( elem ) {
/// <summary>
///     Determine whether an element has any jQuery data associated with it.
/// </summary>
/// <param name="elem" domElement="true">
///     A DOM element to be checked for data.
/// </param>
/// <returns type="Boolean" />

		elem = elem.nodeType ? jQuery.cache[ elem[jQuery.expando] ] : elem[ jQuery.expando ];
		return !!elem && !isEmptyDataObject( elem );
	};
jQuery.holdReady = function( hold ) {
/// <summary>
///     Holds or releases the execution of jQuery's ready event.
/// </summary>
/// <param name="hold" type="Boolean">
///     Indicates whether the ready hold is being requested or released
/// </param>
/// <returns type="undefined" />

		if ( hold ) {
			jQuery.readyWait++;
		} else {
			jQuery.ready( true );
		}
	};
jQuery.inArray = function( elem, array, i ) {
/// <summary>
///     Search for a specified value within an array and return its index (or -1 if not found).
/// </summary>
/// <param name="elem" type="Object">
///     The value to search for.
/// </param>
/// <param name="array" type="Array">
///     An array through which to search.
/// </param>
/// <param name="i" type="Number">
///     The index of the array at which to begin the search. The default is 0, which will search the whole array.
/// </param>
/// <returns type="Number" />

		var len;

		if ( array ) {
			if ( indexOf ) {
				return indexOf.call( array, elem, i );
			}

			len = array.length;
			i = i ? i < 0 ? Math.max( 0, len + i ) : i : 0;

			for ( ; i < len; i++ ) {
				// Skip accessing in sparse arrays
				if ( i in array && array[ i ] === elem ) {
					return i;
				}
			}
		}

		return -1;
};
jQuery.isArray = Array.isArray || function (obj) {
    /// <summary>
    ///     Determine whether the argument is an array.
    /// </summary>
    /// <param name="obj" type="Object">
    ///     Object to test whether or not it is an array.
    /// </param>
    /// <returns type="boolean" />

    return jQuery.type(obj) === "array";
};
jQuery.isEmptyObject = function( obj ) {
/// <summary>
///     Check to see if an object is empty (contains no properties).
/// </summary>
/// <param name="obj" type="Object">
///     The object that will be checked to see if it's empty.
/// </param>
/// <returns type="Boolean" />

		for ( var name in obj ) {
			return false;
		}
		return true;
	};
jQuery.isFunction = function( obj ) {
/// <summary>
///     Determine if the argument passed is a Javascript function object.
/// </summary>
/// <param name="obj" type="Object">
///     Object to test whether or not it is a function.
/// </param>
/// <returns type="boolean" />

		return jQuery.type(obj) === "function";
	};
jQuery.isNumeric = function( obj ) {
/// <summary>
///     Determines whether its argument is a number.
/// </summary>
/// <param name="obj" type="Object">
///     The value to be tested.
/// </param>
/// <returns type="Boolean" />

		return !isNaN( parseFloat(obj) ) && isFinite( obj );
	};
jQuery.isPlainObject = function( obj ) {
/// <summary>
///     Check to see if an object is a plain object (created using "{}" or "new Object").
/// </summary>
/// <param name="obj" type="Object">
///     The object that will be checked to see if it's a plain object.
/// </param>
/// <returns type="Boolean" />

		// Must be an Object.
		// Because of IE, we also have to check the presence of the constructor property.
		// Make sure that DOM nodes and window objects don't pass through, as well
		if ( !obj || jQuery.type(obj) !== "object" || obj.nodeType || jQuery.isWindow( obj ) ) {
			return false;
		}

		try {
			// Not own constructor property must be Object
			if ( obj.constructor &&
				!hasOwn.call(obj, "constructor") &&
				!hasOwn.call(obj.constructor.prototype, "isPrototypeOf") ) {
				return false;
			}
		} catch ( e ) {
			// IE8,9 Will throw exceptions on certain host objects #9897
			return false;
		}

		// Own properties are enumerated firstly, so to speed up,
		// if last one is own, then all properties are own.

		var key;
		for ( key in obj ) {}

		return key === undefined || hasOwn.call( obj, key );
	};
jQuery.isReady = true;
jQuery.isWindow = function( obj ) {
/// <summary>
///     Determine whether the argument is a window.
/// </summary>
/// <param name="obj" type="Object">
///     Object to test whether or not it is a window.
/// </param>
/// <returns type="boolean" />

		return obj && typeof obj === "object" && "setInterval" in obj;
	};
jQuery.isXMLDoc = function( elem ) {
/// <summary>
///     Check to see if a DOM node is within an XML document (or is an XML document).
/// </summary>
/// <param name="elem" domElement="true">
///     The DOM node that will be checked to see if it's in an XML document.
/// </param>
/// <returns type="Boolean" />

	// documentElement is verified for cases where it doesn't yet exist
	// (such as loading iframes in IE - #4833) 
	var documentElement = (elem ? elem.ownerDocument || elem : 0).documentElement;

	return documentElement ? documentElement.nodeName !== "HTML" : false;
};
jQuery.lastModified = {};
jQuery.makeArray = function( array, results ) {
/// <summary>
///     Convert an array-like object into a true JavaScript array.
/// </summary>
/// <param name="array" type="Object">
///     Any object to turn into a native Array.
/// </param>
/// <returns type="Array" />

		var ret = results || [];

		if ( array != null ) {
			// The window, strings (and functions) also have 'length'
			// Tweaked logic slightly to handle Blackberry 4.7 RegExp issues #6930
			var type = jQuery.type( array );

			if ( array.length == null || type === "string" || type === "function" || type === "regexp" || jQuery.isWindow( array ) ) {
				push.call( ret, array );
			} else {
				jQuery.merge( ret, array );
			}
		}

		return ret;
	};
jQuery.map = function( elems, callback, arg ) {
/// <summary>
///     Translate all items in an array or object to new array of items.
///     &#10;1 - jQuery.map(array, callback(elementOfArray, indexInArray)) 
///     &#10;2 - jQuery.map(arrayOrObject, callback( value, indexOrKey ))
/// </summary>
/// <param name="elems" type="Array">
///     The Array to translate.
/// </param>
/// <param name="callback" type="Function">
///     The function to process each item against.  The first argument to the function is the array item, the second argument is the index in array The function can return any value. Within the function, this refers to the global (window) object.
/// </param>
/// <returns type="Array" />

		var value, key, ret = [],
			i = 0,
			length = elems.length,
			// jquery objects are treated as arrays
			isArray = elems instanceof jQuery || length !== undefined && typeof length === "number" && ( ( length > 0 && elems[ 0 ] && elems[ length -1 ] ) || length === 0 || jQuery.isArray( elems ) ) ;

		// Go through the array, translating each of the items to their
		if ( isArray ) {
			for ( ; i < length; i++ ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret[ ret.length ] = value;
				}
			}

		// Go through every key on the object,
		} else {
			for ( key in elems ) {
				value = callback( elems[ key ], key, arg );

				if ( value != null ) {
					ret[ ret.length ] = value;
				}
			}
		}

		// Flatten any nested arrays
		return ret.concat.apply( [], ret );
	};
jQuery.merge = function( first, second ) {
/// <summary>
///     Merge the contents of two arrays together into the first array.
/// </summary>
/// <param name="first" type="Array">
///     The first array to merge, the elements of second added.
/// </param>
/// <param name="second" type="Array">
///     The second array to merge into the first, unaltered.
/// </param>
/// <returns type="Array" />

		var i = first.length,
			j = 0;

		if ( typeof second.length === "number" ) {
			for ( var l = second.length; j < l; j++ ) {
				first[ i++ ] = second[ j ];
			}

		} else {
			while ( second[j] !== undefined ) {
				first[ i++ ] = second[ j++ ];
			}
		}

		first.length = i;

		return first;
	};
jQuery.noConflict = function( deep ) {
/// <summary>
///     Relinquish jQuery's control of the $ variable.
/// </summary>
/// <param name="deep" type="Boolean">
///     A Boolean indicating whether to remove all jQuery variables from the global scope (including jQuery itself).
/// </param>
/// <returns type="Object" />

		if ( window.$ === jQuery ) {
			window.$ = _$;
		}

		if ( deep && window.jQuery === jQuery ) {
			window.jQuery = _jQuery;
		}

		return jQuery;
	};
jQuery.noData = { "embed": true,
"object": 'clsid:D27CDB6E-AE6D-11cf-96B8-444553540000',
"applet": true };
jQuery.nodeName = function( elem, name ) {

		return elem.nodeName && elem.nodeName.toUpperCase() === name.toUpperCase();
	};
jQuery.noop = function() {
/// <summary>
///     An empty function.
/// </summary>
/// <returns type="Function" />
};
jQuery.now = function() {
/// <summary>
///     Return a number representing the current time.
/// </summary>
/// <returns type="Number" />

		return ( new Date() ).getTime();
	};
jQuery.nth = function( cur, result, dir, elem ) {

		result = result || 1;
		var num = 0;

		for ( ; cur; cur = cur[dir] ) {
			if ( cur.nodeType === 1 && ++num === result ) {
				break;
			}
		}

		return cur;
	};
jQuery.offset = {};
jQuery.param = function( a, traditional ) {
/// <summary>
///     Create a serialized representation of an array or object, suitable for use in a URL query string or Ajax request.
///     &#10;1 - jQuery.param(obj) 
///     &#10;2 - jQuery.param(obj, traditional)
/// </summary>
/// <param name="a" type="Object">
///     An array or object to serialize.
/// </param>
/// <param name="traditional" type="Boolean">
///     A Boolean indicating whether to perform a traditional "shallow" serialization.
/// </param>
/// <returns type="String" />

		var s = [],
			add = function( key, value ) {
				// If value is a function, invoke it and return its value
				value = jQuery.isFunction( value ) ? value() : value;
				s[ s.length ] = encodeURIComponent( key ) + "=" + encodeURIComponent( value );
			};

		// Set traditional to true for jQuery <= 1.3.2 behavior.
		if ( traditional === undefined ) {
			traditional = jQuery.ajaxSettings.traditional;
		}

		// If an array was passed in, assume that it is an array of form elements.
		if ( jQuery.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {
			// Serialize the form elements
			jQuery.each( a, function() {
				add( this.name, this.value );
			});

		} else {
			// If traditional, encode the "old" way (the way 1.3.2 or older
			// did it), otherwise encode params recursively.
			for ( var prefix in a ) {
				buildParams( prefix, a[ prefix ], traditional, add );
			}
		}

		// Return the resulting serialization
		return s.join( "&" ).replace( r20, "+" );
	};
jQuery.parseJSON = function( data ) {
/// <summary>
///     Takes a well-formed JSON string and returns the resulting JavaScript object.
/// </summary>
/// <param name="data" type="String">
///     The JSON string to parse.
/// </param>
/// <returns type="Object" />

		if ( typeof data !== "string" || !data ) {
			return null;
		}

		// Make sure leading/trailing whitespace is removed (IE can't handle it)
		data = jQuery.trim( data );

		// Attempt to parse using the native JSON parser first
		if ( window.JSON && window.JSON.parse ) {
			return window.JSON.parse( data );
		}

		// Make sure the incoming data is actual JSON
		// Logic borrowed from http://json.org/json2.js
		if ( rvalidchars.test( data.replace( rvalidescape, "@" )
			.replace( rvalidtokens, "]" )
			.replace( rvalidbraces, "")) ) {

			return ( new Function( "return " + data ) )();

		}
		jQuery.error( "Invalid JSON: " + data );
	};
jQuery.parseXML = function( data ) {
/// <summary>
///     Parses a string into an XML document.
/// </summary>
/// <param name="data" type="String">
///     a well-formed XML string to be parsed
/// </param>
/// <returns type="XMLDocument" />

		var xml, tmp;
		try {
			if ( window.DOMParser ) { // Standard
				tmp = new DOMParser();
				xml = tmp.parseFromString( data , "text/xml" );
			} else { // IE
				xml = new ActiveXObject( "Microsoft.XMLDOM" );
				xml.async = "false";
				xml.loadXML( data );
			}
		} catch( e ) {
			xml = undefined;
		}
		if ( !xml || !xml.documentElement || xml.getElementsByTagName( "parsererror" ).length ) {
			jQuery.error( "Invalid XML: " + data );
		}
		return xml;
	};
jQuery.post = function( url, data, callback, type ) {
/// <summary>
///     Load data from the server using a HTTP POST request.
/// </summary>
/// <param name="url" type="String">
///     A string containing the URL to which the request is sent.
/// </param>
/// <param name="data" type="String">
///     A map or string that is sent to the server with the request.
/// </param>
/// <param name="callback" type="Function">
///     A callback function that is executed if the request succeeds.
/// </param>
/// <param name="type" type="String">
///     The type of data expected from the server. Default: Intelligent Guess (xml, json, script, or html).
/// </param>

		// shift arguments if data argument was omitted
		if ( jQuery.isFunction( data ) ) {
			type = type || callback;
			callback = data;
			data = undefined;
		}

		return jQuery.ajax({
			type: method,
			url: url,
			data: data,
			success: callback,
			dataType: type
		});
	};
jQuery.prop = function( elem, name, value ) {

		var ret, hooks, notxml,
			nType = elem.nodeType;

		// don't get/set properties on text, comment and attribute nodes
		if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		notxml = nType !== 1 || !jQuery.isXMLDoc( elem );

		if ( notxml ) {
			// Fix name and attach hooks
			name = jQuery.propFix[ name ] || name;
			hooks = jQuery.propHooks[ name ];
		}

		if ( value !== undefined ) {
			if ( hooks && "set" in hooks && (ret = hooks.set( elem, value, name )) !== undefined ) {
				return ret;

			} else {
				return ( elem[ name ] = value );
			}

		} else {
			if ( hooks && "get" in hooks && (ret = hooks.get( elem, name )) !== null ) {
				return ret;

			} else {
				return elem[ name ];
			}
		}
	};
jQuery.propFix = { "tabindex": 'tabIndex',
"readonly": 'readOnly',
"for": 'htmlFor',
"class": 'className',
"maxlength": 'maxLength',
"cellspacing": 'cellSpacing',
"cellpadding": 'cellPadding',
"rowspan": 'rowSpan',
"colspan": 'colSpan',
"usemap": 'useMap',
"frameborder": 'frameBorder',
"contenteditable": 'contentEditable' };
jQuery.propHooks = { "tabIndex": {},
"selected": {} };
jQuery.proxy = function( fn, context ) {
/// <summary>
///     Takes a function and returns a new one that will always have a particular context.
///     &#10;1 - jQuery.proxy(function, context) 
///     &#10;2 - jQuery.proxy(context, name)
/// </summary>
/// <param name="fn" type="Function">
///     The function whose context will be changed.
/// </param>
/// <param name="context" type="Object">
///     The object to which the context (this) of the function should be set.
/// </param>
/// <returns type="Function" />

		if ( typeof context === "string" ) {
			var tmp = fn[ context ];
			context = fn;
			fn = tmp;
		}

		// Quick check to determine if target is callable, in the spec
		// this throws a TypeError, but we will just return undefined.
		if ( !jQuery.isFunction( fn ) ) {
			return undefined;
		}

		// Simulated bind
		var args = slice.call( arguments, 2 ),
			proxy = function() {
				return fn.apply( context, args.concat( slice.call( arguments ) ) );
			};

		// Set the guid of unique handler to the same of original handler, so it can be removed
		proxy.guid = fn.guid = fn.guid || proxy.guid || jQuery.guid++;

		return proxy;
	};
jQuery.queue = function( elem, type, data ) {
/// <summary>
///     1: Show the queue of functions to be executed on the matched element.
///     &#10;    1.1 - jQuery.queue(element, queueName)
///     &#10;2: Manipulate the queue of functions to be executed on the matched element.
///     &#10;    2.1 - jQuery.queue(element, queueName, newQueue) 
///     &#10;    2.2 - jQuery.queue(element, queueName, callback())
/// </summary>
/// <param name="elem" domElement="true">
///     A DOM element where the array of queued functions is attached.
/// </param>
/// <param name="type" type="String">
///     A string containing the name of the queue. Defaults to fx, the standard effects queue.
/// </param>
/// <param name="data" type="Array">
///     An array of functions to replace the current queue contents.
/// </param>
/// <returns type="jQuery" />

		var q;
		if ( elem ) {
			type = ( type || "fx" ) + "queue";
			q = jQuery._data( elem, type );

			// Speed up dequeue by getting out quickly if this is just a lookup
			if ( data ) {
				if ( !q || jQuery.isArray(data) ) {
					q = jQuery._data( elem, type, jQuery.makeArray(data) );
				} else {
					q.push( data );
				}
			}
			return q || [];
		}
	};
jQuery.ready = function( wait ) {

		// Either a released hold or an DOMready/load event and not yet ready
		if ( (wait === true && !--jQuery.readyWait) || (wait !== true && !jQuery.isReady) ) {
			// Make sure body exists, at least, in case IE gets a little overzealous (ticket #5443).
			if ( !document.body ) {
				return setTimeout( jQuery.ready, 1 );
			}

			// Remember that the DOM is ready
			jQuery.isReady = true;

			// If a normal DOM Ready event fired, decrement, and wait if need be
			if ( wait !== true && --jQuery.readyWait > 0 ) {
				return;
			}

			// If there are functions bound, to execute
			readyList.fireWith( document, [ jQuery ] );

			// Trigger any bound ready events
			if ( jQuery.fn.trigger ) {
				jQuery( document ).trigger( "ready" ).off( "ready" );
			}
		}
	};
jQuery.readyWait = 0;
jQuery.removeAttr = function( elem, value ) {

		var propName, attrNames, name, l,
			i = 0;

		if ( value && elem.nodeType === 1 ) {
			attrNames = value.toLowerCase().split( rspace );
			l = attrNames.length;

			for ( ; i < l; i++ ) {
				name = attrNames[ i ];

				if ( name ) {
					propName = jQuery.propFix[ name ] || name;

					// See #9699 for explanation of this approach (setting first, then removal)
					jQuery.attr( elem, name, "" );
					elem.removeAttribute( getSetAttribute ? name : propName );

					// Set corresponding property to false for boolean attributes
					if ( rboolean.test( name ) && propName in elem ) {
						elem[ propName ] = false;
					}
				}
			}
		}
	};
jQuery.removeData = function( elem, name, pvt /* Internal Use Only */ ) {
/// <summary>
///     Remove a previously-stored piece of data.
/// </summary>
/// <param name="elem" domElement="true">
///     A DOM element from which to remove data.
/// </param>
/// <param name="name" type="String">
///     A string naming the piece of data to remove.
/// </param>
/// <returns type="jQuery" />

		if ( !jQuery.acceptData( elem ) ) {
			return;
		}

		var thisCache, i, l,

			// Reference to internal data cache key
			internalKey = jQuery.expando,

			isNode = elem.nodeType,

			// See jQuery.data for more information
			cache = isNode ? jQuery.cache : elem,

			// See jQuery.data for more information
			id = isNode ? elem[ internalKey ] : internalKey;

		// If there is already no cache entry for this object, there is no
		// purpose in continuing
		if ( !cache[ id ] ) {
			return;
		}

		if ( name ) {

			thisCache = pvt ? cache[ id ] : cache[ id ].data;

			if ( thisCache ) {

				// Support array or space separated string names for data keys
				if ( !jQuery.isArray( name ) ) {

					// try the string as a key before any manipulation
					if ( name in thisCache ) {
						name = [ name ];
					} else {

						// split the camel cased version by spaces unless a key with the spaces exists
						name = jQuery.camelCase( name );
						if ( name in thisCache ) {
							name = [ name ];
						} else {
							name = name.split( " " );
						}
					}
				}

				for ( i = 0, l = name.length; i < l; i++ ) {
					delete thisCache[ name[i] ];
				}

				// If there is no data left in the cache, we want to continue
				// and let the cache object itself get destroyed
				if ( !( pvt ? isEmptyDataObject : jQuery.isEmptyObject )( thisCache ) ) {
					return;
				}
			}
		}

		// See jQuery.data for more information
		if ( !pvt ) {
			delete cache[ id ].data;

			// Don't destroy the parent cache unless the internal data object
			// had been the only thing left in it
			if ( !isEmptyDataObject(cache[ id ]) ) {
				return;
			}
		}

		// Browsers that fail expando deletion also refuse to delete expandos on
		// the window, but it will allow it on all other JS objects; other browsers
		// don't care
		// Ensure that `cache` is not a window object #10080
		if ( jQuery.support.deleteExpando || !cache.setInterval ) {
			delete cache[ id ];
		} else {
			cache[ id ] = null;
		}

		// We destroyed the cache and need to eliminate the expando on the node to avoid
		// false lookups in the cache for entries that no longer exist
		if ( isNode ) {
			// IE does not allow us to delete expando properties from nodes,
			// nor does it have a removeAttribute function on Document nodes;
			// we must handle all of these cases
			if ( jQuery.support.deleteExpando ) {
				delete elem[ internalKey ];
			} else if ( elem.removeAttribute ) {
				elem.removeAttribute( internalKey );
			} else {
				elem[ internalKey ] = null;
			}
		}
	};
jQuery.removeEvent = function( elem, type, handle ) {

		if ( elem.removeEventListener ) {
			elem.removeEventListener( type, handle, false );
		}
	};
jQuery.sibling = function( n, elem ) {

		var r = [];

		for ( ; n; n = n.nextSibling ) {
			if ( n.nodeType === 1 && n !== elem ) {
				r.push( n );
			}
		}

		return r;
	};
jQuery.speed = function( speed, easing, fn ) {

		var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
			complete: fn || !fn && easing ||
				jQuery.isFunction( speed ) && speed,
			duration: speed,
			easing: fn && easing || easing && !jQuery.isFunction( easing ) && easing
		};

		opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === "number" ? opt.duration :
			opt.duration in jQuery.fx.speeds ? jQuery.fx.speeds[ opt.duration ] : jQuery.fx.speeds._default;

		// normalize opt.queue - true/undefined/null -> "fx"
		if ( opt.queue == null || opt.queue === true ) {
			opt.queue = "fx";
		}

		// Queueing
		opt.old = opt.complete;

		opt.complete = function( noUnmark ) {
			if ( jQuery.isFunction( opt.old ) ) {
				opt.old.call( this );
			}

			if ( opt.queue ) {
				jQuery.dequeue( this, opt.queue );
			} else if ( noUnmark !== false ) {
				jQuery._unmark( this );
			}
		};

		return opt;
	};
jQuery.style = function( elem, name, value, extra ) {

		// Don't set styles on text and comment nodes
		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
			return;
		}

		// Make sure that we're working with the right name
		var ret, type, origName = jQuery.camelCase( name ),
			style = elem.style, hooks = jQuery.cssHooks[ origName ];

		name = jQuery.cssProps[ origName ] || origName;

		// Check if we're setting a value
		if ( value !== undefined ) {
			type = typeof value;

			// convert relative number strings (+= or -=) to relative numbers. #7345
			if ( type === "string" && (ret = rrelNum.exec( value )) ) {
				value = ( +( ret[1] + 1) * +ret[2] ) + parseFloat( jQuery.css( elem, name ) );
				// Fixes bug #9237
				type = "number";
			}

			// Make sure that NaN and null values aren't set. See: #7116
			if ( value == null || type === "number" && isNaN( value ) ) {
				return;
			}

			// If a number was passed in, add 'px' to the (except for certain CSS properties)
			if ( type === "number" && !jQuery.cssNumber[ origName ] ) {
				value += "px";
			}

			// If a hook was provided, use that value, otherwise just set the specified value
			if ( !hooks || !("set" in hooks) || (value = hooks.set( elem, value )) !== undefined ) {
				// Wrapped to prevent IE from throwing errors when 'invalid' values are provided
				// Fixes bug #5509
				try {
					style[ name ] = value;
				} catch(e) {}
			}

		} else {
			// If a hook was provided get the non-computed value from there
			if ( hooks && "get" in hooks && (ret = hooks.get( elem, false, extra )) !== undefined ) {
				return ret;
			}

			// Otherwise just get the value from the style object
			return style[ name ];
		}
	};
jQuery.sub = function() {
/// <summary>
///     Creates a new copy of jQuery whose properties and methods can be modified without affecting the original jQuery object.
/// </summary>
/// <returns type="jQuery" />

		function jQuerySub( selector, context ) {
			return new jQuerySub.fn.init( selector, context );
		}
		jQuery.extend( true, jQuerySub, this );
		jQuerySub.superclass = this;
		jQuerySub.fn = jQuerySub.prototype = this();
		jQuerySub.fn.constructor = jQuerySub;
		jQuerySub.sub = this.sub;
		jQuerySub.fn.init = function init( selector, context ) {
			if ( context && context instanceof jQuery && !(context instanceof jQuerySub) ) {
				context = jQuerySub( context );
			}

			return jQuery.fn.init.call( this, selector, context, rootjQuerySub );
		};
		jQuerySub.fn.init.prototype = jQuerySub.fn;
		var rootjQuerySub = jQuerySub(document);
		return jQuerySub;
	};
jQuery.support = { "leadingWhitespace": true,
"tbody": true,
"htmlSerialize": true,
"style": true,
"hrefNormalized": true,
"opacity": true,
"cssFloat": true,
"checkOn": true,
"optSelected": false,
"getSetAttribute": true,
"enctype": true,
"html5Clone": true,
"submitBubbles": true,
"changeBubbles": true,
"focusinBubbles": true,
"deleteExpando": true,
"noCloneEvent": true,
"inlineBlockNeedsLayout": false,
"shrinkWrapBlocks": false,
"reliableMarginRight": true,
"noCloneChecked": false,
"optDisabled": true,
"radioValue": false,
"checkClone": true,
"appendChecked": true,
"ajax": true,
"cors": false,
"reliableHiddenOffsets": true,
"boxModel": true,
"doesNotAddBorder": true,
"doesAddBorderForTableAndCells": true,
"fixedPosition": true,
"subtractsBorderForOverflowNotVisible": false,
"doesNotIncludeMarginInBodyOffset": true };
jQuery.swap = function( elem, options, callback ) {

		var old = {};

		// Remember the old values, and insert the new ones
		for ( var name in options ) {
			old[ name ] = elem.style[ name ];
			elem.style[ name ] = options[ name ];
		}

		callback.call( elem );

		// Revert the old values
		for ( name in options ) {
			elem.style[ name ] = old[ name ];
		}
	};
jQuery.text = function( elem ) {

    var i, node,
		nodeType = elem.nodeType,
		ret = "";

	if ( nodeType ) {
		if ( nodeType === 1 || nodeType === 9 ) {
			// Use textContent || innerText for elements
			if ( typeof elem.textContent === 'string' ) {
				return elem.textContent;
			} else if ( typeof elem.innerText === 'string' ) {
				// Replace IE's carriage returns
				return elem.innerText.replace( rReturn, '' );
			} else {
				// Traverse it's children
				for ( elem = elem.firstChild; elem; elem = elem.nextSibling) {
					ret += getText( elem );
				}
			}
		} else if ( nodeType === 3 || nodeType === 4 ) {
			return elem.nodeValue;
		}
	} else {

		// If no nodeType, this is expected to be an array
		for ( i = 0; (node = elem[i]); i++ ) {
			// Do not traverse comment nodes
			if ( node.nodeType !== 8 ) {
				ret += getText( node );
			}
		}
	}
	return ret;
};
jQuery.trim = function( text ) {
/// <summary>
///     Remove the whitespace from the beginning and end of a string.
/// </summary>
/// <param name="text" type="String">
///     The string to trim.
/// </param>
/// <returns type="String" />

			return text == null ?
				"" :
				trim.call( text );
		};
jQuery.type = function( obj ) {
/// <summary>
///     Determine the internal JavaScript [[Class]] of an object.
/// </summary>
/// <param name="obj" type="Object">
///     Object to get the internal JavaScript [[Class]] of.
/// </param>
/// <returns type="String" />

		return obj == null ?
			String( obj ) :
			class2type[ toString.call(obj) ] || "object";
	};
jQuery.uaMatch = function( ua ) {

		ua = ua.toLowerCase();

		var match = rwebkit.exec( ua ) ||
			ropera.exec( ua ) ||
			rmsie.exec( ua ) ||
			ua.indexOf("compatible") < 0 && rmozilla.exec( ua ) ||
			[];

		return { browser: match[1] || "", version: match[2] || "0" };
	};
jQuery.unique = function( results ) {
/// <summary>
///     Sorts an array of DOM elements, in place, with the duplicates removed. Note that this only works on arrays of DOM elements, not strings or numbers.
/// </summary>
/// <param name="results" type="Array">
///     The Array of DOM elements.
/// </param>
/// <returns type="Array" />

	if ( sortOrder ) {
		hasDuplicate = baseHasDuplicate;
		results.sort( sortOrder );

		if ( hasDuplicate ) {
			for ( var i = 1; i < results.length; i++ ) {
				if ( results[i] === results[ i - 1 ] ) {
					results.splice( i--, 1 );
				}
			}
		}
	}

	return results;
};
jQuery.uuid = 0;
jQuery.valHooks = { "option": {},
"select": {},
"radio": {},
"checkbox": {} };
jQuery.when = function( firstParam ) {
/// <summary>
///     Provides a way to execute callback functions based on one or more objects, usually Deferred objects that represent asynchronous events.
/// </summary>
/// <param name="firstParam" type="Deferred">
///     One or more Deferred objects, or plain JavaScript objects.
/// </param>
/// <returns type="Promise" />

		var args = sliceDeferred.call( arguments, 0 ),
			i = 0,
			length = args.length,
			pValues = new Array( length ),
			count = length,
			pCount = length,
			deferred = length <= 1 && firstParam && jQuery.isFunction( firstParam.promise ) ?
				firstParam :
				jQuery.Deferred(),
			promise = deferred.promise();
		function resolveFunc( i ) {
			return function( value ) {
				args[ i ] = arguments.length > 1 ? sliceDeferred.call( arguments, 0 ) : value;
				if ( !( --count ) ) {
					deferred.resolveWith( deferred, args );
				}
			};
		}
		function progressFunc( i ) {
			return function( value ) {
				pValues[ i ] = arguments.length > 1 ? sliceDeferred.call( arguments, 0 ) : value;
				deferred.notifyWith( promise, pValues );
			};
		}
		if ( length > 1 ) {
			for ( ; i < length; i++ ) {
				if ( args[ i ] && args[ i ].promise && jQuery.isFunction( args[ i ].promise ) ) {
					args[ i ].promise().then( resolveFunc(i), deferred.reject, progressFunc(i) );
				} else {
					--count;
				}
			}
			if ( !count ) {
				deferred.resolveWith( deferred, args );
			}
		} else if ( deferred !== firstParam ) {
			deferred.resolveWith( deferred, length ? [ firstParam ] : [] );
		}
		return promise;
	};
jQuery.Event.prototype.isDefaultPrevented = function returnFalse() {
/// <summary>
///     Returns whether event.preventDefault() was ever called on this event object.
/// </summary>
/// <returns type="Boolean" />

	return false;
};
jQuery.Event.prototype.isImmediatePropagationStopped = function returnFalse() {
/// <summary>
///     Returns whether event.stopImmediatePropagation() was ever called on this event object.
/// </summary>
/// <returns type="Boolean" />

	return false;
};
jQuery.Event.prototype.isPropagationStopped = function returnFalse() {
/// <summary>
///     Returns whether event.stopPropagation() was ever called on this event object.
/// </summary>
/// <returns type="Boolean" />

	return false;
};
jQuery.Event.prototype.preventDefault = function() {
/// <summary>
///     If this method is called, the default action of the event will not be triggered.
/// </summary>
/// <returns type="undefined" />

		this.isDefaultPrevented = returnTrue;

		var e = this.originalEvent;
		if ( !e ) {
			return;
		}

		// if preventDefault exists run it on the original event
		if ( e.preventDefault ) {
			e.preventDefault();

		// otherwise set the returnValue property of the original event to false (IE)
		} else {
			e.returnValue = false;
		}
	};
jQuery.Event.prototype.stopImmediatePropagation = function() {
/// <summary>
///     Keeps the rest of the handlers from being executed and prevents the event from bubbling up the DOM tree.
/// </summary>

		this.isImmediatePropagationStopped = returnTrue;
		this.stopPropagation();
	};
jQuery.Event.prototype.stopPropagation = function() {
/// <summary>
///     Prevents the event from bubbling up the DOM tree, preventing any parent handlers from being notified of the event.
/// </summary>

		this.isPropagationStopped = returnTrue;

		var e = this.originalEvent;
		if ( !e ) {
			return;
		}
		// if stopPropagation exists run it on the original event
		if ( e.stopPropagation ) {
			e.stopPropagation();
		}
		// otherwise set the cancelBubble property of the original event to true (IE)
		e.cancelBubble = true;
	};
jQuery.prototype._toggle = function( fn ) {

		// Save reference to arguments for access in closure
		var args = arguments,
			guid = fn.guid || jQuery.guid++,
			i = 0,
			toggler = function( event ) {
				// Figure out which function to execute
				var lastToggle = ( jQuery._data( this, "lastToggle" + fn.guid ) || 0 ) % i;
				jQuery._data( this, "lastToggle" + fn.guid, lastToggle + 1 );

				// Make sure that clicks stop
				event.preventDefault();

				// and execute the function
				return args[ lastToggle ].apply( this, arguments ) || false;
			};

		// link all the functions, so any of them can unbind this click handler
		toggler.guid = guid;
		while ( i < args.length ) {
			args[ i++ ].guid = guid;
		}

		return this.click( toggler );
	};
jQuery.prototype.add = function( selector, context ) {
/// <summary>
///     Add elements to the set of matched elements.
///     &#10;1 - add(selector) 
///     &#10;2 - add(elements) 
///     &#10;3 - add(html) 
///     &#10;4 - add(jQuery object) 
///     &#10;5 - add(selector, context)
/// </summary>
/// <param name="selector" type="String">
///     A string representing a selector expression to find additional elements to add to the set of matched elements.
/// </param>
/// <param name="context" domElement="true">
///     The point in the document at which the selector should begin matching; similar to the context argument of the $(selector, context) method.
/// </param>
/// <returns type="jQuery" />

		var set = typeof selector === "string" ?
				jQuery( selector, context ) :
				jQuery.makeArray( selector && selector.nodeType ? [ selector ] : selector ),
			all = jQuery.merge( this.get(), set );

		return this.pushStack( isDisconnected( set[0] ) || isDisconnected( all[0] ) ?
			all :
			jQuery.unique( all ) );
	};
jQuery.prototype.addClass = function( value ) {
/// <summary>
///     Adds the specified class(es) to each of the set of matched elements.
///     &#10;1 - addClass(className) 
///     &#10;2 - addClass(function(index, currentClass))
/// </summary>
/// <param name="value" type="String">
///     One or more class names to be added to the class attribute of each matched element.
/// </param>
/// <returns type="jQuery" />

		var classNames, i, l, elem,
			setClass, c, cl;

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( j ) {
				jQuery( this ).addClass( value.call(this, j, this.className) );
			});
		}

		if ( value && typeof value === "string" ) {
			classNames = value.split( rspace );

			for ( i = 0, l = this.length; i < l; i++ ) {
				elem = this[ i ];

				if ( elem.nodeType === 1 ) {
					if ( !elem.className && classNames.length === 1 ) {
						elem.className = value;

					} else {
						setClass = " " + elem.className + " ";

						for ( c = 0, cl = classNames.length; c < cl; c++ ) {
							if ( !~setClass.indexOf( " " + classNames[ c ] + " " ) ) {
								setClass += classNames[ c ] + " ";
							}
						}
						elem.className = jQuery.trim( setClass );
					}
				}
			}
		}

		return this;
	};
jQuery.prototype.after = function() {
/// <summary>
///     Insert content, specified by the parameter, after each element in the set of matched elements.
///     &#10;1 - after(content, content) 
///     &#10;2 - after(function(index))
/// </summary>
/// <param name="" type="jQuery">
///     HTML string, DOM element, or jQuery object to insert after each element in the set of matched elements.
/// </param>
/// <param name="" type="jQuery">
///     One or more additional DOM elements, arrays of elements, HTML strings, or jQuery objects to insert after each element in the set of matched elements.
/// </param>
/// <returns type="jQuery" />

		if ( this[0] && this[0].parentNode ) {
			return this.domManip(arguments, false, function( elem ) {
				this.parentNode.insertBefore( elem, this.nextSibling );
			});
		} else if ( arguments.length ) {
			var set = this.pushStack( this, "after", arguments );
			set.push.apply( set, jQuery.clean(arguments) );
			return set;
		}
	};
jQuery.prototype.ajaxComplete = function( f ){
/// <summary>
///     Register a handler to be called when Ajax requests complete. This is an Ajax Event.
/// </summary>
/// <param name="f" type="Function">
///     The function to be invoked.
/// </param>
/// <returns type="jQuery" />

		return this.on( o, f );
	};
jQuery.prototype.ajaxError = function( f ){
/// <summary>
///     Register a handler to be called when Ajax requests complete with an error. This is an Ajax Event.
/// </summary>
/// <param name="f" type="Function">
///     The function to be invoked.
/// </param>
/// <returns type="jQuery" />

		return this.on( o, f );
	};
jQuery.prototype.ajaxSend = function( f ){
/// <summary>
///     Attach a function to be executed before an Ajax request is sent. This is an Ajax Event.
/// </summary>
/// <param name="f" type="Function">
///     The function to be invoked.
/// </param>
/// <returns type="jQuery" />

		return this.on( o, f );
	};
jQuery.prototype.ajaxStart = function( f ){
/// <summary>
///     Register a handler to be called when the first Ajax request begins. This is an Ajax Event.
/// </summary>
/// <param name="f" type="Function">
///     The function to be invoked.
/// </param>
/// <returns type="jQuery" />

		return this.on( o, f );
	};
jQuery.prototype.ajaxStop = function( f ){
/// <summary>
///     Register a handler to be called when all Ajax requests have completed. This is an Ajax Event.
/// </summary>
/// <param name="f" type="Function">
///     The function to be invoked.
/// </param>
/// <returns type="jQuery" />

		return this.on( o, f );
	};
jQuery.prototype.ajaxSuccess = function( f ){
/// <summary>
///     Attach a function to be executed whenever an Ajax request completes successfully. This is an Ajax Event.
/// </summary>
/// <param name="f" type="Function">
///     The function to be invoked.
/// </param>
/// <returns type="jQuery" />

		return this.on( o, f );
	};
jQuery.prototype.andSelf = function() {
/// <summary>
///     Add the previous set of elements on the stack to the current set.
/// </summary>
/// <returns type="jQuery" />

		return this.add( this.prevObject );
	};
jQuery.prototype.animate = function( prop, speed, easing, callback ) {
/// <summary>
///     Perform a custom animation of a set of CSS properties.
///     &#10;1 - animate(properties, duration, easing, complete) 
///     &#10;2 - animate(properties, options)
/// </summary>
/// <param name="prop" type="Object">
///     A map of CSS properties that the animation will move toward.
/// </param>
/// <param name="speed" type="Number">
///     A string or number determining how long the animation will run.
/// </param>
/// <param name="easing" type="String">
///     A string indicating which easing function to use for the transition.
/// </param>
/// <param name="callback" type="Function">
///     A function to call once the animation is complete.
/// </param>
/// <returns type="jQuery" />

		var optall = jQuery.speed( speed, easing, callback );

		if ( jQuery.isEmptyObject( prop ) ) {
			return this.each( optall.complete, [ false ] );
		}

		// Do not change referenced properties as per-property easing will be lost
		prop = jQuery.extend( {}, prop );

		function doAnimation() {
			// XXX 'this' does not always have a nodeName when running the
			// test suite

			if ( optall.queue === false ) {
				jQuery._mark( this );
			}

			var opt = jQuery.extend( {}, optall ),
				isElement = this.nodeType === 1,
				hidden = isElement && jQuery(this).is(":hidden"),
				name, val, p, e,
				parts, start, end, unit,
				method;

			// will store per property easing and be used to determine when an animation is complete
			opt.animatedProperties = {};

			for ( p in prop ) {

				// property name normalization
				name = jQuery.camelCase( p );
				if ( p !== name ) {
					prop[ name ] = prop[ p ];
					delete prop[ p ];
				}

				val = prop[ name ];

				// easing resolution: per property > opt.specialEasing > opt.easing > 'swing' (default)
				if ( jQuery.isArray( val ) ) {
					opt.animatedProperties[ name ] = val[ 1 ];
					val = prop[ name ] = val[ 0 ];
				} else {
					opt.animatedProperties[ name ] = opt.specialEasing && opt.specialEasing[ name ] || opt.easing || 'swing';
				}

				if ( val === "hide" && hidden || val === "show" && !hidden ) {
					return opt.complete.call( this );
				}

				if ( isElement && ( name === "height" || name === "width" ) ) {
					// Make sure that nothing sneaks out
					// Record all 3 overflow attributes because IE does not
					// change the overflow attribute when overflowX and
					// overflowY are set to the same value
					opt.overflow = [ this.style.overflow, this.style.overflowX, this.style.overflowY ];

					// Set display property to inline-block for height/width
					// animations on inline elements that are having width/height animated
					if ( jQuery.css( this, "display" ) === "inline" &&
							jQuery.css( this, "float" ) === "none" ) {

						// inline-level elements accept inline-block;
						// block-level elements need to be inline with layout
						if ( !jQuery.support.inlineBlockNeedsLayout || defaultDisplay( this.nodeName ) === "inline" ) {
							this.style.display = "inline-block";

						} else {
							this.style.zoom = 1;
						}
					}
				}
			}

			if ( opt.overflow != null ) {
				this.style.overflow = "hidden";
			}

			for ( p in prop ) {
				e = new jQuery.fx( this, opt, p );
				val = prop[ p ];

				if ( rfxtypes.test( val ) ) {

					// Tracks whether to show or hide based on private
					// data attached to the element
					method = jQuery._data( this, "toggle" + p ) || ( val === "toggle" ? hidden ? "show" : "hide" : 0 );
					if ( method ) {
						jQuery._data( this, "toggle" + p, method === "show" ? "hide" : "show" );
						e[ method ]();
					} else {
						e[ val ]();
					}

				} else {
					parts = rfxnum.exec( val );
					start = e.cur();

					if ( parts ) {
						end = parseFloat( parts[2] );
						unit = parts[3] || ( jQuery.cssNumber[ p ] ? "" : "px" );

						// We need to compute starting value
						if ( unit !== "px" ) {
							jQuery.style( this, p, (end || 1) + unit);
							start = ( (end || 1) / e.cur() ) * start;
							jQuery.style( this, p, start + unit);
						}

						// If a +=/-= token was provided, we're doing a relative animation
						if ( parts[1] ) {
							end = ( (parts[ 1 ] === "-=" ? -1 : 1) * end ) + start;
						}

						e.custom( start, end, unit );

					} else {
						e.custom( start, val, "" );
					}
				}
			}

			// For JS strict compliance
			return true;
		}

		return optall.queue === false ?
			this.each( doAnimation ) :
			this.queue( optall.queue, doAnimation );
	};
jQuery.prototype.append = function() {
/// <summary>
///     Insert content, specified by the parameter, to the end of each element in the set of matched elements.
///     &#10;1 - append(content, content) 
///     &#10;2 - append(function(index, html))
/// </summary>
/// <param name="" type="jQuery">
///     DOM element, HTML string, or jQuery object to insert at the end of each element in the set of matched elements.
/// </param>
/// <param name="" type="jQuery">
///     One or more additional DOM elements, arrays of elements, HTML strings, or jQuery objects to insert at the end of each element in the set of matched elements.
/// </param>
/// <returns type="jQuery" />

		return this.domManip(arguments, true, function( elem ) {
			if ( this.nodeType === 1 ) {
				this.appendChild( elem );
			}
		});
	};
jQuery.prototype.appendTo = function( selector ) {
/// <summary>
///     Insert every element in the set of matched elements to the end of the target.
/// </summary>
/// <param name="selector" type="jQuery">
///     A selector, element, HTML string, or jQuery object; the matched set of elements will be inserted at the end of the element(s) specified by this parameter.
/// </param>
/// <returns type="jQuery" />

		var ret = [],
			insert = jQuery( selector ),
			parent = this.length === 1 && this[0].parentNode;

		if ( parent && parent.nodeType === 11 && parent.childNodes.length === 1 && insert.length === 1 ) {
			insert[ original ]( this[0] );
			return this;

		} else {
			for ( var i = 0, l = insert.length; i < l; i++ ) {
				var elems = ( i > 0 ? this.clone(true) : this ).get();
				jQuery( insert[i] )[ original ]( elems );
				ret = ret.concat( elems );
			}

			return this.pushStack( ret, name, insert.selector );
		}
	};
jQuery.prototype.attr = function( name, value ) {
/// <summary>
///     1: Get the value of an attribute for the first element in the set of matched elements.
///     &#10;    1.1 - attr(attributeName)
///     &#10;2: Set one or more attributes for the set of matched elements.
///     &#10;    2.1 - attr(attributeName, value) 
///     &#10;    2.2 - attr(map) 
///     &#10;    2.3 - attr(attributeName, function(index, attr))
/// </summary>
/// <param name="name" type="String">
///     The name of the attribute to set.
/// </param>
/// <param name="value" type="Number">
///     A value to set for the attribute.
/// </param>
/// <returns type="jQuery" />

		return jQuery.access( this, name, value, true, jQuery.attr );
	};
jQuery.prototype.before = function() {
/// <summary>
///     Insert content, specified by the parameter, before each element in the set of matched elements.
///     &#10;1 - before(content, content) 
///     &#10;2 - before(function)
/// </summary>
/// <param name="" type="jQuery">
///     HTML string, DOM element, or jQuery object to insert before each element in the set of matched elements.
/// </param>
/// <param name="" type="jQuery">
///     One or more additional DOM elements, arrays of elements, HTML strings, or jQuery objects to insert before each element in the set of matched elements.
/// </param>
/// <returns type="jQuery" />

		if ( this[0] && this[0].parentNode ) {
			return this.domManip(arguments, false, function( elem ) {
				this.parentNode.insertBefore( elem, this );
			});
		} else if ( arguments.length ) {
			var set = jQuery.clean( arguments );
			set.push.apply( set, this.toArray() );
			return this.pushStack( set, "before", arguments );
		}
	};
jQuery.prototype.bind = function( types, data, fn ) {
/// <summary>
///     Attach a handler to an event for the elements.
///     &#10;1 - bind(eventType, eventData, handler(eventObject)) 
///     &#10;2 - bind(eventType, eventData, preventBubble) 
///     &#10;3 - bind(events)
/// </summary>
/// <param name="types" type="String">
///     A string containing one or more DOM event types, such as "click" or "submit," or custom event names.
/// </param>
/// <param name="data" type="Object">
///     A map of data that will be passed to the event handler.
/// </param>
/// <param name="fn" type="Function">
///     A function to execute each time the event is triggered.
/// </param>
/// <returns type="jQuery" />

		return this.on( types, null, data, fn );
	};
jQuery.prototype.blur = function( data, fn ) {
/// <summary>
///     Bind an event handler to the "blur" JavaScript event, or trigger that event on an element.
///     &#10;1 - blur(handler(eventObject)) 
///     &#10;2 - blur(eventData, handler(eventObject)) 
///     &#10;3 - blur()
/// </summary>
/// <param name="data" type="Object">
///     A map of data that will be passed to the event handler.
/// </param>
/// <param name="fn" type="Function">
///     A function to execute each time the event is triggered.
/// </param>
/// <returns type="jQuery" />

		if ( fn == null ) {
			fn = data;
			data = null;
		}

		return arguments.length > 0 ?
			this.on( name, null, data, fn ) :
			this.trigger( name );
	};
jQuery.prototype.change = function( data, fn ) {
/// <summary>
///     Bind an event handler to the "change" JavaScript event, or trigger that event on an element.
///     &#10;1 - change(handler(eventObject)) 
///     &#10;2 - change(eventData, handler(eventObject)) 
///     &#10;3 - change()
/// </summary>
/// <param name="data" type="Object">
///     A map of data that will be passed to the event handler.
/// </param>
/// <param name="fn" type="Function">
///     A function to execute each time the event is triggered.
/// </param>
/// <returns type="jQuery" />

		if ( fn == null ) {
			fn = data;
			data = null;
		}

		return arguments.length > 0 ?
			this.on( name, null, data, fn ) :
			this.trigger( name );
	};
jQuery.prototype.children = function( until, selector ) {
/// <summary>
///     Get the children of each element in the set of matched elements, optionally filtered by a selector.
/// </summary>
/// <param name="until" type="String">
///     A string containing a selector expression to match elements against.
/// </param>
/// <returns type="jQuery" />

		var ret = jQuery.map( this, fn, until );

		if ( !runtil.test( name ) ) {
			selector = until;
		}

		if ( selector && typeof selector === "string" ) {
			ret = jQuery.filter( selector, ret );
		}

		ret = this.length > 1 && !guaranteedUnique[ name ] ? jQuery.unique( ret ) : ret;

		if ( (this.length > 1 || rmultiselector.test( selector )) && rparentsprev.test( name ) ) {
			ret = ret.reverse();
		}

		return this.pushStack( ret, name, slice.call( arguments ).join(",") );
	};
jQuery.prototype.clearQueue = function( type ) {
/// <summary>
///     Remove from the queue all items that have not yet been run.
/// </summary>
/// <param name="type" type="String">
///     A string containing the name of the queue. Defaults to fx, the standard effects queue.
/// </param>
/// <returns type="jQuery" />

		return this.queue( type || "fx", [] );
	};
jQuery.prototype.click = function( data, fn ) {
/// <summary>
///     Bind an event handler to the "click" JavaScript event, or trigger that event on an element.
///     &#10;1 - click(handler(eventObject)) 
///     &#10;2 - click(eventData, handler(eventObject)) 
///     &#10;3 - click()
/// </summary>
/// <param name="data" type="Object">
///     A map of data that will be passed to the event handler.
/// </param>
/// <param name="fn" type="Function">
///     A function to execute each time the event is triggered.
/// </param>
/// <returns type="jQuery" />

		if ( fn == null ) {
			fn = data;
			data = null;
		}

		return arguments.length > 0 ?
			this.on( name, null, data, fn ) :
			this.trigger( name );
	};
jQuery.prototype.clone = function( dataAndEvents, deepDataAndEvents ) {
/// <summary>
///     Create a deep copy of the set of matched elements.
///     &#10;1 - clone(withDataAndEvents) 
///     &#10;2 - clone(withDataAndEvents, deepWithDataAndEvents)
/// </summary>
/// <param name="dataAndEvents" type="Boolean">
///     A Boolean indicating whether event handlers and data should be copied along with the elements. The default value is false. *In jQuery 1.5.0 the default value was incorrectly true; it was changed back to false in 1.5.1 and up.
/// </param>
/// <param name="deepDataAndEvents" type="Boolean">
///     A Boolean indicating whether event handlers and data for all children of the cloned element should be copied. By default its value matches the first argument's value (which defaults to false).
/// </param>
/// <returns type="jQuery" />

		dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
		deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

		return this.map( function () {
			return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
		});
	};
jQuery.prototype.closest = function( selectors, context ) {
/// <summary>
///     1: Get the first element that matches the selector, beginning at the current element and progressing up through the DOM tree.
///     &#10;    1.1 - closest(selector) 
///     &#10;    1.2 - closest(selector���AQ���H ���a��0DO�fa�W�X��8���d'p����<�]3�
���J!/̮���P��w�҂
�S��耐f��|f&�]k�{rF~���/*��f:Oz�ɜW+CpXL0�1��"�O����(���=y;��*he/ա���I�[Dyk�@��q�T�m���e.;��2;�/<(:1�l����w;C&%�J�$;��-v���Ye���M���.�Ɗ)F����f7��V���[D�\�ʟ�~�]>:�^R��mN�2w��k(y�'�+��8�ήq�t ]���z�D�,Q��l��g57Ê�wc�<ɖ[Ce!����cE�FEQ�縢�y.Q�cN���,��i��eJ����)��eC��L���||l���A�JWub�cS��*��v�t-�>�-����-��9<2賔��_��^&��WTƙz+Y���������s���ۡ���`���B���(���	 Y�%�y���׷(��͂�K.Kc��n�;�̠�&�%ot���h�8ψ5pg��[�� o��Ӟ�8fm��X���.�})[��,lwWF��]
��S6x$���Q�����o��nx0��f4=J�r,_��FQ�}Id*�Y��Z�?���ꞵ�o�-X��ێZ�{�R,O.���BV�"�,+�]ʵrY��$v%����9�[��S�%�P�`��$z��JK@��h�+<{��環�(i��F��<��!יִ�ޢq�dl��lk�Ē��R�|�bPX��h�jK��Es��Ʈ���}�FMl���,ʈ$��"�!l����:�|������vSeRDy��8�^������g��k؂������C[�v
 �F_rӟŖVO��_�kk�n� ^#x� �.�62J���Q�j����`<7/���Wx/�V�����1+�����(�hvJ����k�E��:1�MXT�!��{�g���C��5��b�m	���M�. ^wT���:`^��,)�7�� l\፺ÒR+x�mu'er�
Y���Ю=��̤3@���6�A�ɣ�
{�/�[=�u��g��}f&��yۈC9�'n�ԇ �1������n���$�����x����*��S��}�P�4�vٿ`@qS�HH�:�����,���%�̶��s��9+���6*V�������t
@����2\�(w
CnA��4�O%�Ó��q��=\@f\�dt��B��q�2�)�E��,x��+oT�� �2@�20(�`�x��S�
��̥}��k0@�`5f��B�i�3�l�V��I�%����� ��˜��阧g�gR>�<��S�{Bf;9%��D�5oi0�ވ�����n&3���X&"��	ə	�ҏ�#!�<� ���K^��4�=���κ
��'i�N��ɾ�Yʭ#�jE�j�nG۽�M�,rU�6�	*I*((�a���S�mV� y��ʸ ��&��.U���-�;�V�>�!���p1����'������l�6ߑ>os��\��lr��{�oH��AA"d�>i�����������֢��)�0os5R/����Z��2I�y~c_{��X��2�X+)��<{��%WA-��
w�1	:��O�	�s����}K�)�	�fZ�����%�l���E>lV�P��7�Kr�6����$�Ҫlr���kP=�AMS֡�m�p[��:IJ����CZ��rC�A1�U|ۓi����37�Z~佺����C������Q�'���sL95���HӵL��(���
﷬��]PR-�P���J'�@��g�������5i�JF�l�b&�G&�dO��l������w��s��4o�9�˴^����1>2
�i����qf���9�m4I��X)r8,RZ$��vo�f��wae
�vŻ?P0���H�D��`��Q0��ޔ��h�#C������ǰ�$������ 1�Ӈ$�K�����
�ѵ��-�|�X^r�\r���T���ޫTq��=>�8.j�n�4�>;"̾���w�߮�?��3�{R��z�
n��0àCS��D�3o�5�qc�ާ�>�8�[2, 􍀉����d۩n� �4���T� ���n}_������r�#�&��ӑŌ3at�H܉NI�_I��� ��v��S�S`-#1���l
���C���[��H���W��x�\���r7�.$�6`K��y
"�0~ͪ�F:qO���
r(�T*��;Ge���A�ܗ�W���>�a>]n�eΙ
I�U9`�a
�����!v�I�~����<Pb�"����
n6��LO���Z>���d],g�+L��87^LEiY�@��z���ڡ�ݼ��V�M6��X�N�	��+�ՙ�!�:��JD���W�|�2��uS��W���݃�Ne3�䪊Ti�%H\WM�-�@���R�Ks����m��k� �':�v>TB ����l|,�����`�>̺��-�2J)��"����)T8h���=/otޟ��~������Rg��O0krhл���wv�R|�A�_�y�r�j��>r�|�:2��>�擰��ѨpmFT斒�����,c����}^��hz�ͅ~qc:'Q���8�W�������_ ?�
���+�Ut$�U�r/`4�+h�ң	Iη�34��v�V�r3��m��ʨ�e�静�d�ݣĢK�Z�|T\,��Ƨ�E7�~	N�R4N� �$�w�Z��n����A��`+��V��$��-b˗�X�ޱ��vn�()��)A3H/=ӱ��N�7�� �Z�!b�=�w����Oӕ�ή�<������U�\�ܩؙL�>
��FT�{F�1�a f�u�ZA��te��vI�$X+�>��;���5�������Bu/�
d����a��^������
���+j�U����Q��R��
�ɾ(��6�N@G����a���=\\�Z`�lS��	�UnEC9P~j`��+���*�C��_�޺\�Znn�r�Eo�Et1b	��MP/��X�Z��	Z~]� ��:^Xcȓ#���ڢ�� ��A�i�J�R�ʆf�	��PAB9a^��Ɲ�,��~I߳"B�}���H��K��}�ʡ0�.�)���?/�^j��,������Q�Y�ߛ�G(��$�E��� K6ס{�+;�7B��^ �(Y+�>���8�E�a�k��y�Z_�=��N�q�����4�a���@�?@����l��k�'K���R�3L��rmF�ZCtP�Ѓ7u�
��X�pK��Ů�
�Cӛ���s�@��_k
W^���Ji�I�u�X�eeg�Vfk�2�k�/���5�ḚL�/��:����ϡJ�j���V1�
U�|���������
U���-��r}���-o�I�0-F�M[S�Ƥ
�z�j�|jTj$�"|jD�qZ�VS�
��Ugoj�w� ۾��T�3���������)��Ȥ�NN��<S��p��0��R�wض�t�|)t*9[�@����@s�
�-����#�_p����(����d{�X`ڳ��3.B㢬z��,[��m�J}�J;��)�s^2H򢊕l���WO�FW���QB�,k�������f%�
�2��z�f�&��p�${���'痆�i'�5<�X��`��_O�5Te
�7�/)^*�U��Q��	2�'��/,C���J���s;��SW���J�-�a���t�tܩ�=WR�̰�:CV�t�G'�蛅C�U������΄5����®�o�{
�(��ѫ�kcOˠ�m�A���c�p=1�4.����1��;��g�cv�	Wca�> �R�@pi�A��'>Τ~��g���ʑ����XtȽs��r/��q��Ц���q�����ip����G~@��߿������''eRa�G6��2>9��u����.���UO��AG��9� >��Y�����13����`��Dթ����;�a>U����a��(�Y/�~	���m"�5��|����F�SGd�� k%F�#�!ˠc�����7��!�c��� �{��ޓ9����8Q� Q
���^�%U�|��������J���yj��YA}�ıOX�<"��;
a�v�� 
}Wy��Mq�c�Ċ?�1k�ٓ���]E3�UO��gy6��d�T�� jb������6L�Z��]�����'�C
��wg���O�+έ/J��
֢<K��58�UfO`o��
�ѹ���'R�%��F�i�L�S(a^O9GQ�QT��Q�U]KI�ώ[D��T_�<w�g��޸�M������Ƶ��9���a�����h�5B�鐐ÛR�&���.T�&�[=�H&��V6��R:[L��R)7ˇ�KR����;C�S��8I�ڊ���kl�+��?oB�j��I�J�G�� ��oHx\(,|<"8�w{f�|��b᳐X	e] X���x��*o��$�o[:I}�s�kV�*qÊg��K=�[R�I�� �P,=F����ޮ�
H�EC�-i{9�?؟Μ���2h7��MM�&Q̣{�n�5���8Daxڕ���i���k���^�;�EVXE&����h��%����L��Y˕�Z#KBd�94Z�c�l���'�h��(S*䬕E��a>2*4lJ�tv̹J��d&C�;,�u�d�h���Q�
/
2P{_�T������U�Ye�F���ڋ��(YeV��n[$3������f�YgA`�t����"«�����.g
n�K߄�d>�K�z��(�{Ŧ�΢��s�s��{<4�������
�{?k8����Z)��R��fY�����9��)�^���*@�+�wD�k�%h�v,M&o��)����;������/
2T��/[��Gc�5z� |E:��4��v�?V6�tP��L|�σ���w'���/�kf�/c��M�}h��|EC��$ܺ@�����g�ϓ4�<�-�T�5{�V*~Y�S�+'ϣW<�,�mg5�>��S~8٭=�O�k�\Wd^��,ʇ��|��a6 �m.7��� �*eu-Y�W+e�C�4���/��S�jiw4��Y
V�c��,M�<���� �k2��-=0�����W
���S)�%�ȋ}��W~�2�E�_)�2KP-P<XF�+���"�T5>|�i�J*�
��SFKq��0F�E�Nq�N���ד��'�b,$Xcc�#�+�B
�/������U��e�J�n1���E��`0֧l�
0ꊑ����KaG��o!�� `�#�����[��kQ�F�"��k��]+�v����j
�e65�NS�so""Q���
|��=��27�Z��o)1
◿�zx����G��AA	�<��;X��I�}���F�1����5)��h��	t�gB��IP�#��<��*J�E�1t7���q����Rfֳ�u�+�,�r;�m��
�b]i��,�o�M��E�l��
0{)�һR�~nz|%]U�P��xI�T��GJ�=9̺ا��=y�H��[��blI�p�b�,Tᩓ���n�]�S�,��
;��L$���u�Wl-�K�A�<C��Tp��T Wu;�

���kWި�XPnmʋ�d��b)����N��X��d�*d{aC_,���&���u��rP��o^�V�����h�0�Dݴ0��j>`�Ī�_��K�����m�����l�-w�~_�'z�E�i�p�MY��.�W4��p=|�䊢�6y.~���#4�f�I��!xz�Z��Э�О��@ �&� ,���fn��tR�CM!O?�L�e��I�}֤;r�Ǵ���DV�rۥqr�V�m�}�v���;}�ȴ�\�Gs3]#Yɣ�7g���'�wjz�/������*�j�)4u��=���(��w��Ƒ��]��V�y�]ޏ�Ƀ�y)�E}$�/ʻ���*�#Ū+�%~ء�A���H֍�RڄW+�>KJ����w���ODy7����C��xȖ[g˅Q��f��a�G�Mxc��[����ň���t���b�"ϧ��ş�Xi���`��p��G�
�y&�[�W�T(J��~����du:�Z
��6'��z�F�G	��'�gݲ��śDm��jo��6I���g���?xӍ��eeD�e�JiI1��nﳒ
9��ll�����#4�+�?�����zh�߲�\Ǽ����V�-�;��j�O,�ƚ�H%x	 R^&����b�X2:���^�O�r�J(�,�x��E
�&ڷ�1�
k.�dN�ܝ$��
k���>���~I�����Hy�wHDޠ*����PQ��DJ;_"� �	�Hk��;z��?L�$hed8�&���.Q
� �nb��}0"�$ׁ&	�D��Jމ���(q4Lcp�p�&� ��&�%�dɟ����$42�.x�a9 )�K�C�3߮�D���,y�6�o����8������s���*)w��L�b��+����
���0�	O�4WD�>�
D�
��	SO�`h��\�����I�'�I�1F�W�v�>n����p-��xI0�J�?�I��<!g_����� �	�wB�H����y�c����>�MA�o O��@�{��	G� #0��C=���0���
�]E�H'�d��<���`�U?F��A���1��a#�N��K�m�`��H�PC�7Y�]�ڣ{�����1�j;½��VX
�J����3,��3��,���g'���p�^�\VC?�_y���.�]:r�T¸4��{.N��	%��ŽX���+Y�|��v��7�q1��_)O�/�O�=��V{���Wy��s��b�{�Vە,~>�x;��VVC?���<����?~_�#?��b�v��{~����p�?6�aܤ�a����Ï��5���Џ������v��W���+�y���s���{�XVە,~>��k^å��~,�?�i@j?͒vyW��kU�T�e�Q���^�>��2��x���"��&�NjU�����U���	�Ֆ$�_K1v|
�N�~�0��OjΞ5����d��h��mߗu�.��%�m?�m������n�v���Yqڊ*��J�88E��b�0�ݔD��M���8S����Yz���1��+�,=!������#Xz��~q$K7E����,��H���/�b�9Q,�K���c�Y���,��h�׃�����-=Xzr�~uO�ߓ��ړ��g&��O�i�?H�3>�S��~;�ߎⷣ�
��VHz���d�C2�l:a��_tkˣ�wc��M	���$�Tv֝M%n�j&3I�fܪ�lfjvD1"��"
��z������gs�'V�i�f}�[��VX�ҏ6���'u�&�ÿ�/��d[��֏Bk����G*;�u���ŕ`QT.xh���f��R��v����`��ɗ�<���h�>�h�,0Z�R�xxdQ���WЄ<�#qt�C���M���cB���?�kq0��sX��V<
'%�P�ˋ*G_I[�3��c�+}{9�u]�&�(z�Q�6�jK��=��(�V	�Q	,V� l`�� o	6�X��	�O-�|�? s���3�cL=;�\��L�_�o�_��&�};��Wm�!3��� �f�q�6�y?��K���*�ǭ����e.��/��-&� GB�Z�;N�w�
J��<�]�������&�(�Ŏ�N�@;JN����b�F-\��k�,h�|�V��pi�J1���pE��sW�����{4�<-�B_�,�<����J�3Hq�(��]n��:��I=�1��_r�z\.t�\0�$,��eυgs�����좘t��b~��,�9���{i���w���<졥�������aݳaˀrw��ag�Aw�6�p�mi��l���ζ����Sz���	[�3J�}�V�w`��!���l	��0z W�JA�Φ�
�a���Vf�쐧=� z	��>��]�U��7������+&<=B�"�R��Jx"�$��x��(ʐ��i�����X<���G�i%<ݣy�:O����z{�YK1u�q��q���� RS�it��4��/�Ɔ����iD����W ��؃�8�K�#
��0dn
��˰o�j�ȵ����}��B���T�C�2�B�$�$����E��2u|�,�����*$|�>���X���"�}��6�Z�Ӓy���u�qz\DpŜK��`�!�}���H߅ݤ��ګ��?�|�.�Oߝ�껰��nRxz:��4�R��*g���.	�?�&�2<�x��#<}�7O�������������=D�ޝw��]���q9>^1"��~Yߝ����O�}4v
P�H2�}0��� ٗ��z�������}�p����)���f�
6�:�)O=��j���we�]<W��z㑀��	Q�ԋ��L�+���@�<��<ݓ
c��n���]{`��R	�S��T1�B�&�$�����(��ԩ������)c񽛮�v��x��{R���u�趦L{���$�����;5s����⛅$/.P�;N���$/�.	���8Eű�S�I^l\8V^��u]�B�D�Į[8^^���[��n|�n|�N��(���?���%��_����E�OU�/Q��oA�/Q�����E�/Q��E�/��_���%N;|O}��0�1����V�U���4����K��K��K�*�� �	� �/�����"�/��"�U�/^�����>ff����}��ξ?����P����
����=���X~1�����~�v,�ex(-ٹa=?�m/�T3�{�~ː�U���2��������7��9���(}#�~8�3��z��4�v�q�L�y��ϓ���Eg2A �A�(�9�Ңy��RD.���F��Xq��.�o�JZ`'A!$\x����n ��/�: 6'���`����J��d���(�5�mc�C)��#���}��JM,o�����V�(%ؿ���f�C��G�k��U���\�cY 4W��e����[	l�
�$,�-"����UJ�W	�AC7�(0l!id�U�H%�@���4����6��%�*h]�͛+�����-��5ЄM�]�_��8M�s���nx���49�J7X�n���)t� ��A��<�ʍ��*�
_�����m��ܚE2�޳ۍQ:whV��W��>Bs����DY.PǓ+E,\i*Fu3�;߻���ۊ��O|�VN~ĭ�՘7Fx�-6����ܫ�� M�����rO���:�Ռ8�.�5D���-0�.�)
+eP��
:��P�)OK���p�}8��߈��Q�"��B�m�]F5.�g]�������� \���9Q.�փ����I*O7���\A�r�`�^
����r��!�rw���S!Εt��<���U��B�FM󓾺b�<5DQ��(]H鼏~NR�m� �gA��"e
�S�5��hqI��#��",�j,�f�x��'}|�wy���(�?%�)g�P�B�yeղ�o��|d���&Y'�k�q��u\,j
�dA��� �r\8@V࢓XV+>Iz�o�64�ĽЮf�A���(G�y*��jQ�sl{����(c��7+zw6|��l/���!�!���$��R/�U��(g�?���H��N�xrX�b�7���,bƁ�y]�-�ad��*4�%����P�z�R�8��s�淔F��j@�=�a�� J���)�`W�.lDi��c� �
���e�}/�ٶ_�� ��5�+V�a���8حK���L�U ��P[g;�|���_DN(�p�+��۪��v𚳪��*�������i���$��`u���c���QƢ��KQ�NVZl��e��Q�����e�b���gR�Y�+���=��<�vV�<�p�c�ڰ�q��w`�oW�L��L��t���1*w=��	��o�-1q���B�$*ܫ�v,�Jf�Mr�^׾�t���
�ɌK�̸2�?�΍qy�]L���bIL��������r�}��̰��!<1F�֨�3�If�3���h���0S/�b?��{�G0���,�K�OQ[īĢ�s�[�%33�Εvtïp?���{X<r��
C�pq4���,eV�� ��v1���x�;�g��#�6"��<�Wf�S�m�P=m�r���Yv�����5��5 �G���+�����������-����
(5Ƣx@E�*�ɸD�t�_�Nғt�Η��1�/�e�$���LD4jb�F!�$�.1�C�
T�9��*_D�2�����;u����]ν��s�}�.�6mH�4o�p����l�j�&�<>�R7��i��w��(8�!<�
X�󜝺#��t�[�m^��긃��0��g'��k%��
g1j�k�k����	�
]6������$�Z�m��-��Z�!W�c�a=�Y*pZ�Z��tf�*�o�Zq�x^��k��(&�-��Sy��U~����x���x�
��)�N��c����=&Q#����}U�����b�N���f{\k�vO|q���잘�!EKX�61����{��m����Z���(H�.�'3�aYG~|������_�� ���=��C�7�6A9����{|�ǯA�� '�?)|!� <�U�]�
{F���
Mh2�@�]�sHT����J�=+�/�{����r~����,����h;8Gö�1���^�\�=��Q�/�6�y<��h?��/���
�L�\���B;3��V���S��
�k=��.�4�� qc��5�Rȩ�$����f����x����(*K�*ʉ�nl��
T�8�Ew9���[���%tf��}qph�|2F̛<N'�c�%�`��L�����%r���*x�<��N���18�;%lX䙂���C��TS�g��s���8Q�̝()ԨN{�W>_�`yW���=/�����h��뼐�pM���yX�� \&�
���|��k�Bt�	B.(�u��P�Y�
��2���1�cppoK�t����@
�'(�J�+x�<N�(_�B�ٛ����9/Ȗ�[J��%�����I��ޮ�)e.w�iŪŐ3�b�=�VN=\����넶�8)k?2C�zT�?��q"\Ԡ�!��B�*�:0B��z������u�N�c���9-������9w`��>@�����TN��ݰQ^"],R�7��nyJj��fY�^`��Z�)�5��rL*��_�J���h'ݩX��ҵTʃ
�m���q�8&uT+�� #��҅,;Ь
= ���O�V)ܣ�DC����c���hkS}���.�{F���A�F��-�qJ�zd2|��~�ţ��w���|}D0�8�z�z����i�����D��>��%�w��0

q6��%F2l68��e�L�O��#���>���P��c�����*��/�����Oz�]�
=�Xnh�3Y8{��_�(�-_�����V����7s�
��Q�#"�@=�f~|�t+�*8&�a
�
?χI{(s�������27_u�/en��uپ�x��3�N���!�}5t�;8�^�����(TW-V
�s�b(\�9�i�����N�ϱ+�ڬ
����
2U�;:)oSg�*�,:ݛ��.$�~��2��ρ � i��
�)����.e����E �
�
�8ܯ��-1�Gv�
tEr�%?���.*��r���t���Y�{�]��%O���%g%<����%��n�*(ٽ���룞�k�J1/,x:���~�s
J�_�:g��w��D�ޟ��^�)��f%l6������O�{g��1o}/��n�{��
�W������5n�����1Ѻd-}td�_�4���Ǵ�ڰQ�%�R5t��}�{�? (�����D�0���ѝ�F��E��`0��B��`0��`��GO��`0��`0��`0��`0����`0��`0��`0��`0��`0��`0��`0��`0��0��`0��`0��`0��`0��`0��`0��`0��`0��`0��`0��`0��`0��`0��`0��`0��`0a犼?�����~qt���t��F����������|��|��|"/�L�����Z:���ٓ^���8���(�ώ���<�ρ9����;�NK_�~6VK�����R���Niiܩ�}�����W���JN��t� W-%{��|/�9CK+6�EG���E��a;���혫���X��I^�����'9���ݯN� C-��w��Mg���� -�Z���v~��E-�GOo�R[UƧZ�x녳Z�.��"��������|p�_�R�=��E�yx`J-"�> y��~��wi��t��m�A�o!>�G(�n!�Ļ�����P�]�P�
����W�LEcs����t�J&g��W���J�Q|�eg 7o�����8��R6��/X¨=Y�1�l9��J�u���U�*E�YT}��ʦ_�
�(�jQu�f�m����-P��fW�RQ��՜ˆ��@���Y��t�c
�
D�Pa��V�E�Q�UvOuI�7�P�#d�)sz��M1�m����S��>{��K:)�&lr�^?vb�lCE\B��	�4��T��3!_fC�~��������}.���9�(�3�!  $(r�G1B0�	I��%�	�
u#���v-������K�}�9�33��7h�t�y�<~�/�7�w.�y�{�s&17]4�͇Y�0c��f�'�W��x��ױ����c���Ս�p` �1c���֦�'�f���ឆ�m3Mj�@D�"�Ti����d�0��2Lz�e�>�1��5��a��O�,�%f[���>!B���PĢ���5�,�����a�-�vPq�#�U�g��M�.�k�Q��Qk���PSd�e��A_��C˲β�xS�������� �fClyؚ����O=`�tC(�� i�=as�3꺄G���Y�3��;1�Zkט�Z�tu8�m��f�B��K���e6�75�����@/�2b
Q��4���%f|W4 ����V{B�^��U|���y�g��ի}�w�cuiUuuE��S�)]Y�S��������ÿ|�w�������/�ZY���S����r��zEe�׳����+<>Ge��W�S��WZ婬.]�����**}�����~�Jl��Y���ή����u�]뚜K�F�
).�Myx���hpw����,1)����l[�y#偁8m��[��e�V�Wޱ��s ��hyk"*o��b��5G��]���~�~Fi�+m�����]�걶��{ȕ�4=�|~���4cCK��K����6�$7M�w��Q�A1���B�2�.�����������s��H��;a�9�x--��ДdD����d��M�fs�i�s}W��d����mؾ �+�7�ΰO����
Q�Nߞ�ĠE)i���5f̷|
Rt�_�y~�g�e���t�d��%<��!�lM-���!�E�?�j�J#f�����FJ�A�a�)M��U�'�a����R��K;Fc��e;t������BKd�"�9$Rȏz�e�
,GVLF�+S,��8�0}K��əK�6N�x�%���9�i��o�8�F=O����ݩ�P~S�r�pT��#lsXb��y�.��%�5|��=bL��&U��䑘����\�̥
G�Ӓ�'ω;������Ry��Hˈ��/2�D@~H}���C�+������ڈИz�t,��$�:}��}#���'��rT1|�o>�f48Y4?�0�V<�	[�N��i���f�b

���J��O�����2�o2��<1��I��2�{E�;ES�6ev�O�`[${j�r�#�0����Z�,�y����hIw���t���� [������&���לE�>���v��e���+e��D��f)s�d�'J'�8�������N�n{�ٽ7LުfX�/�-1)M�3�n���������0SaC~���^,���%���P��D#�Ι.�O(�ZA�L��TRO#�X���[zҷd�^�/e�R稌�(#�İ������^�gy?��(�elzYx7���ƙ�NJ�H��|�bt����Tb2����I��{}:���<�w�*_��l�O;1#
�ƃ��a�������
;~�qҖ����dᔕ|ގ�k��y�[>�0m�üʎ/4���SY���/��?��/��������%Y��,�8_����b�#��st��]#�ٖ%n����p��v�4�����j�u�5d׺�ݚ��a�2��G�g��1�3��/9���W8���qC�S�KZ�=�fƍ��������AM��ց�xW�zR��%���g�^Q������ƫ��^O�1���ݓ��>,�7���'�_�0A����sr~'���	�<ǟ�C���,��B����
>.�]^�!�s�o _�H�����Ը�S�^���������n��|�ƟG�a���BP���4���Wh���V���'5.ЅƗ�z&�ߪ�E=��B�M6�4���i|1�I�����>��[
��{�s��}�M�S�~8�X峋?3�����a�Ww���BcC�]<,4z:����>��}��>~�����i?��i
���vql���oWu���~�x[h��������3~���\�]�.4^�ߧ��ߧ��Fq�}vT�����2��\h���y��y�p���?�[4���m*�#xX�� �
���	~�Ƨ�_���7k|�!���������,|e�6�L��{������g��J��I����?^
M=�ZM�R�np9/a�����ǥ��4��>�M�xq1w��� x���'��ݞ�R�o�|q��7�>.�M�C���<���\���s�n1�q�k��eЯw�/�>�?�����n���ta�_Þ�{Ľ�gm���^����W�K��X��ݲ�����`���d:�ٸ��L^����粌�,�u���E��>�j|F>��$G������_>~���L��C�"���x�Z��cr~�͊��~\�_��_.�����%��u9���j��
�:p~1E�A�f��.���Η�q],�n�O��n�}�%oU���6	�E�jC��A��n���p;�B��B�K��e��������<�?K��
`�.���\��fw�r�W^��gP�o�����7�qoN�=,�e�>5^	>�����Ai�!����V`?޻��W���c�c��k����}�˟��� ���o`�m����CiϠ��7ttf�}?��ݐп���fD�w�>�����'���Ds�{� ������ ?`���	�+���w�$�I�ח�����r
��u}9�Q��7H;\����^p��P�����(G���w�����%�sc���-�Y�7�?q��<�������t�?T��W�w�i�g��j���4��,��Ը�[��+R���_��wk�m�_x���� >O�1��������O=�������Ϟ%�����|L�}�G5�5�j�G��Z�/�i�������+�V�e�4�e��|���Y㹳�H�%�h����/��m�s5;��K�+�	_8G�wj~���c�?��-����?��~�!��5W�߮�5����Q�_����k�7�-�v��j����;�M�_^���N��o��8�L������y��<��u����>�
��}�#��=��ݦ��SN�&��������O����1�O�/�q������Y��/����߂?��G�j�M�j|����7�?�q<��o�_�����?U�:�2���P�9w��h<
���Z�]��#�c��8���*��)�?��'���߫���k�ap������\S�V�ׁ{�q��_��ʯ?G����G��t��Z�h��I;���{��bE�T�������HH	[&�@�o&37Ʉ��83	�����yR}"ŪT��u�u��%�j?�ǚZl]R�E1��Z�9��.���\���d�w~�����?w�=g��}��S��I�|�6��p��=���9����o?����É�#>�?�O��O�r-�h��ׁ�@�a�������o�?���ė�7��O�{�ˈ�	���:�
��^��9O�P\:|'�,������(�]�=�6F�r�G���o���_H�;�y��D���ӽ�(�w�������6��������	cQ�ċ��o�y����?M<~'����%~?x��c��	~<��w����G|E|�����|-���sx%���4�_��:�V⟂w?a����/%^>�x�8�����*��$�|�;�/%����>���y���8�������Wv�Mq�9� >����'��?�8��E��N|��?�q�+�σ�C|'�&�'_��!��	�Ϣ���C����=�$���=A�W��I�|(�����Ot�>�Ώ/R�!�3����g������ ��K:�����;���أ��7���<���]��B|�����7�/%�=�6���o"��y�Ώ�!n'>��C-����|
�G��?O|�~��D����O���������� ~|�⳿��T��������Z�C����~�
>����/���,��ħ�?J�|7���I⏂/'��
>�3�|��qB�8�/O�Л'N��'l&~�l�8a/�9o$���������&������~��ğI�=�K�
�Aj?��"N�t��D|x���2�����^�{H�O��ď���������G�sNw%�M
B���~��
>@�������}�ʓ�}��k'k1y��Kȹ_����s�Xr��!�~�
9����s����EYȹ_xC������Zgv�o�_D�|�Tgv/��?]�����;�A����
�K�� �K|x���%��J�~�u�}č���T���ݟ�����ǎ��{��� �-e:O�9�ɷn��:�n�>Z7��:�n�PZ���uj݌u���]u��f�������ʓ�7�>���ߟ�����Q�R?̳�A�����z�.�W�w�_��χ����sͰ?0]��e�^�?��<�����z�6L��)Sv�uz�Ui^��~�� ��,��7�����\��{���ߠ�l��@��/8M����)ԋ�̊isطן�nP�˿��}7����=�Mg)�c?�� �f=h��mv>+�t�F���w��������>�BH��);�)�n������z�l���"�,x�R�%�����,{ʍ6?M�����g����!�g�_9�������0/��e�{ǈ��/�[@�B��Ѯ���	V���j��������ģ�[�\���7�G9�����*�'#�O�t���S9�?w�t{�u��_�/B���c�u�s��a��L�/ׂ��!��C��>��y�y#O~�a�K�Q�6��`�[���9e{.o#��W_�w7�~������/{F�� ^��}�C��,�����X��o�U.��3a1�-�7�`���A���V#]�S�ؾLx�4���Gag�����M�S����u�3�8�s��O�.T#�)�^w�X�q�R5�Ű��g��I�n�����s͏,Q�OM����7�?��Uo!]���,�V��>��_��퟽���>�R���o�}���K�yM�Ϛ����J;]�s
���8�ܞ[¨���������w��~�I��������:;���	�^̿W��s�����?Ӹ��f��G�B�y��4B�x�
�P���Fp��������}6�����z~��tGF��+����B;Σ�5��~�[#��et�������Zpϗ������,���vӼ� �xɟ/G�����k����y���4��W��K�� ������˰�W�T�j�s��=��u��A����P}�$���`g��{v����tٿ�����g�]!���7�D��f��i:��4�)����=���GL�_t��5�S�������عv��y�����{i��e�y�/>��!�?�n���ӡ�N���B\ײ�?9�d����L2N�2E�D�$01mZ�~OL6�[[��l��e��H:+�x���N33aq�(⩔[�Y[��l�d��?Oe:iQ��S��E�c��f2�Ζq�aT�j�y5
��� 68%X9��~Q͂�`iŬ���VV��|�	�� �-��J)��ptm�W,>�i��YQ.e�U>�a�Z��"TSk���XvK�*�f�,v%�s}�r�{�{/�����owH��a���dq~]��^[#7No	G�`�<fyCUpn�!�Ü!�Y�T��F��*Z�'u�v8�.���$�٣*�1��j��*��L��dѼ
�|�ɗb�2I��ȗ���z��o�|�"_�w��Z����e��Y:��XF���o)���o)�k3몎��Cd	��L����0�ĲA_�����0��0��J3�y�֊���T'Xu/dIk�tCn?n5�J�i�#�5���kCǠ�k���H��~����m���>�V�bn^�z��	]���rV}�!�.�c�i�׶:RifÑ63*z�h#յ
%{e��Y�W��٪�֔�%�F�*S�������<V�(���.�B��O=3�kGs��D���Q�HD:��
��t.+w`B�6�u���`N���;��������F:�:��K��@<�.bmS/NK�6k#5�56�$;��\�*��Ƒ��UR�� ���w H��@�ے֥ئ���bmKJ�G#Y�~���:�E0#�"FI��F;ђ��X��d�YNG��C�p���NFt���DDjm�b��VByFD4!�=,j
���v$�g�S4k����i(��#�Bf�9�١�C�~�mf�@��5�m�3��n��a$S٘��sτ2�Ж�vY���l@G����D��	��� �R8�@
��b�kRJH��IsƤ9�T�ә+�Y��@�֑T��%�'�;I��h��ʶ��&#�������$�f�R'�\J����"�!"�"bD@�]722q29q�3S�QL]-?07�S�\&un-�|�( 95�����������8Q�R��	X�c"⨈�E�GE�G�[P���S�|'$����a6$�!R�!R�!R�!R�!R�!2�a84���Ȋ�HP]$�.T	���V��9�T�<!؊K��������'1���Q{�J��+q�AM�B��q!�T��Rl��ݵ��jA�҂�]J��t7-lR+n��`��.�Es`�4*ͩ��Y^�9H/�^l��RD�G����z�2u�����Ƃ�r�rB� ��T`Mx��
'��B]Z2�5�X��vr
�!`D��*̪����Cǥ9�n数��q�m+mZ9�zV���Ծ����tI�˩[B�n�^8͇��~�77�1F �"Ɩ���L��Q/'��i%�qٹ�a�\E��ɫi��n�V?��tR�z��Q���N��4�5�D�����\��d�&ε3Mz��w'@$�$�۸ĵ� �����wĵ�+@<Z �!� �M� �Ixu �h� �L��t7��� �"�^�����q�W'@�� Ľ�@�Wu�h�-F��*^}��l�
 ���o�|Uc�z�U�<�j�M��i��n��hTd֫���6n��jᄇ�\|�7qH��I"���h�Rūo��mR����m}U��j�U=Y�U�jpP
{V2�V������[�W���Ǯ^���B�R����F�|:�|��Ek^|�C۵4k{/v/�⥬'�@�B6����X��u�;�%�X��c��/�M%g�O.A�t���<�����t��V�dr�����]���|o�9o�v����dJOE#	(DRqx9
��QR��[�X����t<����� �"0.��[*�sd��&S�p'V����E0�	)bnB�#�fV��	z1!4r?�(H>f^�$z���n��8&m����m�4��P�U�p�tgg �ʕ�ܜHM$痒����[ �.�O��/��Ƨg&�>g�z� ,2f��Xl�b��UQtU�]67�Z�f�}"��bXj aa��!��#�����߬(���ݢ�̊���b���]�
c�)e�([�H�l�c�=���c��G�ޠ
���s9�Az~7d�^F<�z�X��؊�����T�E?�	�Ƹ<�)����̲Ua����,/�j��]ί[&�'�si��aHkp�!-[.�,\.�r#E�(��K�K)eq��Tuz-��g�䐷	��%��/gr�sH�����
�3C��e��ᰏ�����eS�LFh'w�x�0�;QXN�D*]d
�x�I>��y8)��)z���NĖk�GK�V�q*�Q�^�'��A#����!!������6·[��#�2�ٝOo����3�4�2/�/u1-�M:d��v�X��9���B�"�/���3U؃S�9G���/���7�ʰM�3�˗�R�٦��d�0A�q��_G�\�te��	 RA5�tZI�r%Ed�@ٯ9��hWz���T�&��Q���B\nr�2���2>ZZ�rpZ�ÑI�����q�](�/�g3�KU�qg�]��ȮL aӅ��$-*����v���T����`� �PLH��Uz�`��YǇE��rzm9E�:����s�M�!/
N
���V>.����RwE��g'�5b��t��͔qe�j��ƕ�¨ɐ]X����p����U8��H�[�Č���"�H
~O<��Ph��V��q_��[��̤/3��:p��S�Ӌ���Q��O��ٳ��-ʖ�ݐyt1S�X/k!wjz�ԉ��ԩ���ɥ���	�e�a��Cq�H�8o]���(>9����:�9�چ='NM��?%:�0������wΏϡu��: A�z˻P�xf�#��"��A�@�f1|��8�R0CҬNN/�G��>�C(�<�<�͜�R({L�Q�(Ls֐��hBKz+1�ȜnEg|����ײ����k6v�uCq!{93��\�p,;�
�G;�9�K�e^b��]E�g$���1�
e�n=9|��9s��==�[|�1���}�4�_��<�o��F���p|D���ܕ�n$���+��s�B؈D���ezb�Xxhz��p8:�����kG��5C���bG[<21��y�y�y�y?~^����r,|:����Lx:���ߏ	�)e�<���G�u��³�ܥpr��H����>�'Ƣ����Z׎>��@MPQ�.�&x,p}`&�(5�Q%�)�(�����?��l�R�\nq��E	 �_�G�qC��_�	E��~�6u[������ �Y#��s�f�	ŚnhR�V�EEi�������bh�G�V/���̌�-�7����k7��jψϪ�����c��gu�����@s�) �]�����+�Þw��A�3�q��^�\�׉������ �"v�[�B@�j��P-g��!4�E9�����=b:����#͌�G��c��G���#��
e~j����Hk'⧪v����Ń��c��^:;ةi{j���B�d�U��Y��S���bV��<�z�wo��s#�7Q�>�t����x���	k��`�Iv.J��h�o�E�tR:i�:L;3�t��'l�Y�K�`V���SaO�F����6�D���}�ٹo��Sg�9�vV����.��;l2P	�d�`wIL�Ȝ.iD��I����`#�!�M<ܛk�vA�I-�۶�q���lx�^�A�T'�]l|��: ���^Rǡ��>v�8�DU��G�.��)���3W�|?k6�ｼ��cѹ�BԶ]?.��\�k��
�{>�o@?���@�Tj���Wap�	��:�W ���@y��W
�ꞃr�g��p4�?hX�٫�q)��5�٫}Ȥ�&?�ˏ��4�٫=d(6��OYn� �?@��J�}/����h��W{��b $֚U\O�ZU�� F}ր;k�M:��_�8����������
������u��O��C���6P �����U�C��Q�j�������>;9Ē��~E5�Ԧ_SAfb��V�T�����:j�o�w�rWC�i��ѿ�d��u�C�e�����@wV|�j���
&���G�L��N�-'�� ������\S�Fw� ���\�:�>_Jo
��I�%�G�� Qv��K���b`��w4�/�%%�@U,���~L��Gl<$�QNɣ�L��J遖�8��GA7O��bO��er'|-����(c�.�@Zm�44Js6>�7��̂$E�9V��j~
�Umz�`n]r3fs���֖ٝ�ܝ��=�0�3�q+9Ɋ�ʁI�*kF����:J�f�A�n]�ܺB���8�eab��ca�c�a��0��A�5�k%,`�ݰϱ^$7�z�e�el�Z*u�A�On�*�c��u~`��䖴ƒ�f�g�Vc�b�#״^"7����R�/�fXN���7�ϭhȒ�d֓K\w
`Ӌ����΀f pm��T�Nf
���\���t�d��� �K8�b*�
Qy���f�1��M��׊�]������d��%��#6U^T�X�W
*�?�՞#�/q�E�p���"�D)k��$��2|��� �G@�M��Gl<�yF���t�-��]r3�B�3��W�	�����S�^z��(	i"���+�"�%`x�n=�Y��<�Ԫu-㓌D�O$b|�.1:������ 2� g0�Q�_��8���~D6�Y��r:����4��(�gKr�K�4��FXv~���p�gn��	�i =�r��3=�5�oV��]W�R;���Hm� ���<J��'R�4�x}y�Hm�L�K�_��)P�l�CjG�ޞϏ�x����1?irӐ��`�[����H ^��$�O����,��{�������|�����</���n��c���-^0��'�M$,a�0�k�v��@"`�ے�@ ����z�0oq�0�M�*K�v �s�j��_%1������GYn�D��T�,���S7�-�~Cv#�9�0
֛~����'�~1B��
CFH��j
4�)r���Q�5(���b(g- `��u�h�W
qe��p�pU�*B�qaD\�o�*�Z �h�!F]�TU;�c v3� �TI/s��v�?ɫ =jO������xp2������Nk��0 ��&�O�R#��/�%�n���D�7#ş!;�����`<#3�i�Fy���ZV�JBF
'��Rc�Ҩ�T��t�%/2}��@zR��
:�(q�����V�*���Һ�gO���m	��+�I�MA�ٞE�n��e���TfY�0��2+
��������C�g�u���柀$���7�Z������"a	3p��Ԉ��h���2kB�C]�?MwJX`v�%�H�?�=͌Ts4�>������.=��8����Ts�An2<������Q��Q̓��T1§~�<�9ѳ���QȟQQ�<�8���X��֙��.�;�W�8Ѽ
|J}Q`_ʴ,�Ю��l7��|����4��Ώ�xԼAa�*�$ ��J���Q���j���F7����i =��[*���HUJ��T�t{*�Q���&�j�����l w>CNbF<��|��*-:�&@5�l�p Ֆ�#<���呔U�e�t"%��V<�`�\rhDb�Gl<d)J5���!��DZ�>�yߖ��F��@��w��П	F�����Č/���{�+�������߶L��A�/�xxw֯T}:9���H�c���lֳȁu���0^�@
^��)x���ǢS
~,�a�nݕ���)��܎Q��$�^EC����0}(�h�'&�f	?��n(95��U��ja��X�a&a�K"E�K"E�J"E]J"E�J"E�J"E[K�� �`G�!n�K�l^�$��Gy�Tb�
��5F��o��L�n*��X����B�])�Ų�f�a���g[(�K9�K����h���#6��RsD�#ʊ�7�طq4�8�Y$�V2��eQ��'V�ߧ�n
��'���I+Y�1�������A_��H����롏	|p����,�/T�B��{V}
yH���c<����U��x�Ƒ��кJ4g1�A~�{�@��k��C�P��V��E������nu���<����G���U6�S
J�գ�m��s��y��>�~���i�G�OS���?Yz�n�\Ү��V�U!��pp~�a�Uk��$�3�kB:�
�u$�贪�B_]�ݖ�vf�_)��#ٝ��lv�B�����>��R��_a�4����Y��{����)���a�
�u�m���{gv��;�݉���aw1���}�F�v�a�8�og`�v�a�wv�L�I$���nvkfb��	��ٽ�������v���)����}��c�����G�~���*Y���nyvkda��Q�:da��6C���f��,l�,��fȦ,l�<��͐��`�t�d��Y�t�:�N�daʦa!�
���Svi�c��T�jDn���� r�Z��-gM'���Kd�frs�]�>����Z֛�c�T�?ȭdie���#���Ũ�V��,�6�Z-��du!��5��ք2���&�������zr�X��o=Jn]�(����ȭo�Cn��
�k���q�j��P�G�*y��:,�����1�5�����-�����U�A�:Q���
�2~��Bä�
�����_u}G��ws>����S.6nO~�Ux�&����M�W�a��.�Y)���%&��V��u��t��J�{��L׮�$���@<\��I������s��]0Xc6����
�.�*��`C�J��HYTO�����\��=Ϲ����x~��C�s�R�#% =�J��f�U�Uݟ���P9Y_�[
01	����=�Vq����!O}D��
�"k�X���[�[&Z�[P��+���Jh�[Z�g8���EN_cEYM�
����q���<�\<�њ�e����1���<�ձ��U���
�Ú9��S���f��V[������g4�A�|�?�̃�u%����ד��f�\_�+��p��j��
��'Am~T-0 ��ݹ�uGCB�=ۑ������)���;ZO����� c	Ҧ
���;����k����o"��.GU,�4���*�TW*�����U�Zz.W��ލe��PU�7�W`]}��츺 ;�oˎ��[u5��p��L�q�����Ȏ���EMd��?
�Ώ�x4a�ךѝ�L�Zp��M5�k+
���	:�`ikrs��3���P�j���ڇ�s�i��~�+�U�V(GF2GtV/
�k�D��h�Ӟ�*r�`�v������XK�&�ǃ5v�jv��j�����ڀ�i����րwj�U�7����I��]e� ��n�V<㺡@�C~�z<?b�᧿����
9�D!�/����_����Rb�/sp�+.��f���*p��T���n���M��u�j�J=��7՘B�4��:4Qc�4����4��P��j|�ӽ�u�k2��(�w
y��H�W�1�z����,#��|���AwQ�g ��t����!*�
`G=���x,&�z��z���]���z�bcK$�!2)���v$�V=�no�#Х��Rȑ;?b�Q#�1C���E)dP(/�H�s$�C֊�*�z,���M�Zĺ ���f�p�m���|��
~��
R*�|u�ݽb�|CǺ^��s�n"#�Oi�K��
dK/.�x��J��f<?b����K{50d.qn�a.�r{���!.��I�Ax�����n�x��B�	r2{�V�ok��V�e�u-,�_�e��ޢ�8���ԟ��[�R��(�{sʧ����, �m�x~�ƣ!��WO��HV��>'�}��<⤁��h���ˠG8���f��GNf�%�����]�
��6���m�D7��W��~����t��'����9?�'���	8E��<
8[b&s�U^b&��<Gb&��(1
�Pg)򖻖��u෗Ӻ���e����C��I(X�����bQ8��������t�o�3�h���()����\�Iv�~#.��������l�Rѕ1P�/�k�����`}W����	��5d��_� �s�(��I��\k���O������v=?P�/�<���@ѿ���<P�/� 纮
Jq{��P6���|$��(�(Q^��W�D���D����
Z8��%�%��L�~R����X��H%���&.�Y�3���#6S�ホjlC�@z�z�ٞR�?4�cŗ���{��4���K2u_����r9�g���j�-������b$otti���Gs���#� >�T�
ڑp|4߄�r2k�Q��\M��y&D�)i���R�"��>��c��r��֏�Gl<��,Gz�Sښ�i =�
�H`z�H��1l��[��sv�w�D{�PC����䙏�O��Dżxg´	�-�ބ�&����5	�Mo�5�}	���-Oj��<��D1d�|/a�D1d��<a�D1dl�O��Ŵ�`�Ě�Ĵe`�Į�Ĵe&`��)�Ĵe`	G��'�$�E�.H�d�Xyp[��\9| �������������C�$�5��׉oO��"? ����d�,���Ĵ)rY������S�Hp�mS�Hm�6��S�H7�n�]S��p��ק�e�i��y��"�E�O��S���9_Q���=�S�Y?NH�Vz�N�f�8"��A��f�8}���7U����E�	ϊ�Ҭ�/B�<��J�~���|:U��?��>�x�I�~�}�ɝ&��_��_O�iҬ�c`�w�4i֏c��}ӤY?�E�r�G�I�~�5��0M���}�YӥY�_�#�ؐb�~O#��y;L�f�e��y���f����N�.����n�.���[���c�A7G �&�6ݜ|�{���\ |^⃺�	�{��.οn��ӛ���·PBޤ>�O�|�"T*i�3����'a~I���7��&]c|Q7/�N����n��,i����1�PϤ����|,$4"�o�s|,$4>	�ʿ�Lh��KR�οÌ /Lj�x�ì�:i�m�.��I��q�m��$=������D҇�;�1��']c|�a�>�Tf&��a.~7��3s�I�0�%i���kI/2��0O�}?q{��0?N���]u�?���Ӏ������|+G����lR(�wi���'�J����bB�|�Y�'�	
�~x���{�DܬnV�7������1��a~�GB0�ξI�?�R����2^>��yi/����
ym�	U4o_�K������q����O.v;x�-6Ζp�Q����$T%���pp-P������a[�|\�os��q����� ��^@��yH�(��Bsq��:'��p�H���|��K�ޏ�8��`��?_�QlC:�m
%�ﻦ33Ņ�Ѵ,���6������o���#���14��Y,=��da�Z9n�!F���E�$�`b|����`jB}��I=z�a��Z�m��]�O��R4��P�x�H���%�s�k��8Z���om:+",�
�*^�����o����D�V� x�S��f!�h�����\\�������������ΰu����X��.y�lJa�H(�b+�rPbS��<C��l��JmJ��-J�y�N(=bSj�]�G��ޱX��mJX�[(���#P�ӦT��
���)��g�*EF����E(�@^���֫bW7s�3���}u3j�p�w׎�E��ӡ�bqm���bL��̍�^|
^F��i�8P��H�PO��.�'�AW�.d�^rˌX�(�w[V�Gf�}��L+�Po9�W�|�!/�7O�혱P�P_/�5�$�.�R��G��5pr�e�Gl<E�/G�,4T�7[�w(������)�	S4�5~!�d/� x�qq�h2ɀ'�&S�u�	�9>|h%�ǖ���H����E��� �Kؔo�K���P���玼�b��T�_r�}��� /;_$�o ��9�fv�ɑ�D�������_���#s��*TJ�E�\G� w	��K
֧��T�h���+�ݛ����^ Z�I�݁����iY�`':�.vD��V�`W�0k7�����EA�G�L_�x~z
�ĕ���2XI_�g*}w��o�Pe�E��#e�bYJ�me�h}���m\��?h�l�Gl<����ln��䦁�@+�~Ӹa"}��YV|i1n�
��Su�ЩJ��PT;a��/Q�����2ZIʏ����������jϏ�x���$n��2�R�V���@6��վ�%�!l���t�t��FkY��3@m����ڿ�D���R��/�� ����)���AjϏ�xH�7��o8�ӈ�R�V��O��f)�:Ca9����iK?,���0��:��U
h�����������n����]�F@�E����t�@fJ�2��q�Fd���x�.C��v���Gl<n��p��Fob��Ԡ��I三�xE
�ɩ�~��,�j`_��7������m8�X,-��r���������+��ױV	��ױ�Z��*��x�8��F$�s�:�:%d�\�
i���@Y5�R��8����\)-\>���j�����G^kU���.n�KvQ���.��ՇWJ�<�1�+��K;���VJ����T�*i�2x��U��j�*iႫK��s+��vd{�y��jʝ+d{�����6Rs�i��ȗ���Gl<l ����A����@��F����Q����z�Q��B�c?�A�)+�	���Oy��	q�X�(Ճ�3jYQ:���Ħ>�p����j*.�(
��l~�M��҃��S�^
���oo�@��*��^�(���j�q�E����,��8�[#�U�	|�~�F�`�F��8�R�kŰ
&N�V{��s�"+��uZ+�U0�
�J�o�D뭨ݳV��`nh��^+�Q�n
���ub�����:1R�-V`�6j��{��U�nm�:a�ˮ�bm�:a�ß�V��:a����~��u�W��O�i��W��J���[/{ةNj��e���X��>�
�[	�%1�
�[	���zح�HL��Vg%�^v+��%�^v+�w$�^v+�w%�^v+��$�^v+��%�,{����[3&����ST��z~������ϿC��`�Gl<j�hEM]z�4�<4���W[�>������̷Ю]\����.`��yhV��^���'�ܳ�X�����{�z��i����t|�&�����ig0\��
߁	�
,����l4a��iW�=ďv^?ﾧ��e}	��7j]�N�kxY��X.�)�	E�I��,��
��F�l�^�:_ g:1��\!��&Q
�<�r!<	�˷��#6o0S��Q�Eŀ�M8�9��߇�7׋Ь��V��vR0h!nZ]r2Q�;(�^�_�y��[^�����#�j�����H3/^��e���r�,�ͲP�(Ѱ�q��
z����1�����7��7�6>t��[���������j�d5��j�������l�p6�D�q�b�U����[�䡅�8��N�@X���+i�A���9z㑸�2��?n��x?��'3�C�W"}��2}K_D����	h���ԉ�d��k�E69��:��9���_!v��\��?*S�ʤeLC1S���b@IC�5١(�55uL�T���,rZ� ��ŀ��6��[�9\]�0:���6���2&xs�eP{;����}�]��`��ꬢ��_�Ŀ�d��W���K�&z���R�s��c���\ �h�8�	��J���.b*M<���D-��Q�b��F�5ۆdw��ː���1�S�,�qR-����|6۷/z�f�v�z�EJ���|���V���E�/o��
��	Q�C7U�z{�h�MT�+u��JnaF6F5LIX�]��+
�+�%q�KI@C(li�i�K8aX,3EI�N�9���=�D��-��p��|���tXm��%��Һ`����=k]��c����,@��%2ڠ냊�'|�ϕM9���I��&-^�!r#�m�9��8��� 7Ҿ�:���N�R�1�msF�0Z$���DQ������i���I$V�@³dg)Lji�e� �����뼓�}L���9
t���ñu�g�Y\�H���UJS�?KQ�#�*K��Q�����$�0���4d�]e��qi�e�8�)r�">ᐠg�t�pT��z��K��'N�D��ѹ>2��R�H�8��q�::�7�u��Ҫ���v���C���ɭ}
�zh/r�����W��*&^Z<��<��wI�?ꑔ�a��0���	[�ޒ]q;�U��0���%@�xE�`i#.�$�KW�</����mg�s�ƞ�8��y�fVX���S�@��7LA�'5������� G�v�����g��k�O�j�kƀy5:��c��j�k���h���/�y*g#{�=�=Tw
b���z��Q���6bT�@}�;��ޱ��~>I��8K��l�td!Xȅ���(�O��
��Fq�������uT���F0:�#ҵ���lэG#�:=ƺ��[ F痘����nĜ����p8h�#�F��b�3
h�@��@�dx�����h�@~ϟ@�*�Q��s�@�hM(�c�(˓�Yh����"P���N�Y�3�!�r=3��3��Y����� �@
tl�z�
A�Tӑ��� 饚�V��"n��nNI7<|����j�fv�g�ǲ���c��/�N�����?����$L��T)�.K�����]��F-��*��kg��<s��̱�2g��μ�\�o[N��Anb�]q%ų�z3O����>���/�MμB�?�r��n�*:vr�!��2�q�qfe��8�	����[X�����mY�:K�ۉ��2���ƏW�,�o"WA�ۇ�8]X��G��%����	(ZH$�V@�@��	(۹w�!8pOmy/se<|ձ-��"�w���m<�!ig��G;��@oh�ŏ䏀�4-$�{�
��&�ޯ���M|WJ���?��Xf]M��sZ�(E;�U#�lj��h��J� �U�'�;�>!��$��=��ˢڪ��>��y��r�9��2�����j�ѥ���
�_Օ�8@�����H��zB��� n>�F�!���~;W����-��D	z�xd�"~r�s�<��p�3����~�3��)���� ���@L�%��KFlU\�얐J��e/,� a��j4��?W�a�6��������m<>��A_�>�`7b�(d� qVP�ꅻ��Q�{y���#����5���9��{�j������f�9��{�jў#��V]5��!LCB��W18���5�� �K����c�G�A�q�F��1�<`_��fr"�|���S�`;	���*#�����}�	�ݹ��w`0����B-{d0�����
�=}��~	�É�É�'f� #�uDX�#� �.�[_l���A'.�OS��I{�h�
"��R��z�ـ��ϥ�����H�w�̟9����o<�o��T
[�����f�Lt��%�"�/�ѥ��g���y�7mG�ZaS�<#[�.�__�˫��p��s�*{E?u�VOH� }�Y��`�2�W��b�����(ӷ�PʽO�$�K4���$�I��I쮔S#���&R�Y�j�6B��HR� վx:I���2ߗ��Wl���xn]+B���YcA���K��F��
��V���
c���sF)�"�D�����1W���,e����Ѣ���UQ��3����V�23��Aq�̫ ��,?83���(�W^]�DZ�!m�?�U,���7��GgVknR�i�ReQW�`��\N�U.��5^��V��r����۩��pzf���;�k\ �C��u7�T*���k��&<����zϬ�
#Ֆ�R���lK�2�gg����Ŷ%���5�"GU4�N_9G���ZQ[*�D[:8C�xЈ����hK{f���ָ��U�h�v�\{R��j�&Zұ�hW+%�#��jM���3D�Z���v�N�mW��%��C�|%fT��8���}ڒک�v���ʶ�@��H����_4��4nr�D�{AȺVĪi��`�$(�r�WQ��+1m*Yq��3(�+5�^�z��	Э�/�?2��qB�2���`�VCQ���=D���j-*�?��49�1���p��h��w]�����r]l�k�3����!w���otǝͺ�D��&:����&:��Rt�����tXv�r?f� X�rk�/<�G�=����@
�u��/��0��&xĩz:�mb�f�1�a�c$
��I,��"Z��0�p��Ŕ	��]M|�(�����J�Q��L�W�1�DOīj��;���n����)y��ـOJ�!<|G��M6-T�ّX�c&(�S�ϔ��I�笺���p���qSr�ǅQ����x���������M��m��-U�ّX����B�}��!�����8����"Hq^��A����&zc���[	�)��^�'"E_p��p�z�h�ώĲ(E[����HQ%'R��F�
�#Fz��Z燑����a��D�𔚊�DFxJ-�sC���ڊG�ߗ����Q<�D��S��7���9�
�hK���ώĲp��еq��}�]����mh0�H{t�f?uФ|���*�]�����i��㦼I�Q%? �5�����̯���ڼH���De'�0>[��}���$���n�pQ�A�N$zw�k�D��b��D���d��%��KN@{҃{�4�ǃ�k�]P�B�.��B�А��<���$�<�ٚ|1ҿ�[T`�J���38���o�9���۾�7��c��/$�S�gGbY�M���sE�t���E��"
z���Z�'�hT��K}��|���M���A�H�s�q'��I���a2��8M�ȁ't?'�;:�PAc�����}�����lw>�%�ίAw ������oΒ^���I�y�-�T#7�Fq����n�����TɃ�K��� �d���K��V�{�^B8���\�����ɩ�����Ŀ$�c��ݦ��8�U�K�x��ƣ�^w
���(��/�;���f�[x��T#���0G��Q����"r3o��q/���ħǾ�b�~�G-��юB�h�/��9��4n)�kZ�
�ZN��v�JH��j�
J_��E�������xTqe1 �zRPqr3��#�	}��;G��V�>L�������D���V���%�vu���-�wJ�
�ǫFC�K�<���Xk���Ч�Y-D/��Ч����7�Q��*�]�Ru gIX��I����ԉK^�/�܋^_ aߊ�)���*76}���[S����5_���_�hl�H�4!��e�Ʀ�Qo�����oP���������V������'"�����K���m<��>���ꉒ���ȭV%�(}�{,�
w9i�ZSO�uFd�#Iֳ,_��_YDX
�	�|��G?��s7b��6� ��f,��DI���`~����ܧ2��n�2u"K��L�U'>gQ�����Ix[�+o��ø
�K��2��ۙ�'w/[�������a^q��v�d�>wZͽ���4�|0$�T�e����M�`[%�c�wE��.�|&wD��Ờ�Nkh�����a���Y4"d�p¯)�1f,��M3З4e�GbAz�QA���R�߂�k�Z.�L[0��Z����I��#3��Zl�e��?��z�.S�
�WIŉ
��n(N�kf��{�h�ū�Y���0҃P��T�a�m}��)ő�b���ӯYR��̸�܌R��h���x��O��n�M��0�M�5�!��`��4�)��Q T[����8)_.�x#ٲx:��,�bh�����B8���E�(`�B� H�DZЗp��옡�iT��!n{W62�9����۲cFRĽf�������B�Lv��A�/�x�9��ܜ4��DL���ڍq��,r`��A�o��`a��`8����'�쐬a�'��%��SDk{
~(�$׫h�|�3�ŉIE�0˞�*�G�be7��g��KT�ޅ!��̖�NViX[�J"E]J"E�J"E�J"E[K�!��v��%��)�L�O�{F��<C̱%N�}J�!�"}�S���G�8<��%��`ྨg��O��*P+�A������x���ġE�<Ч�s�ϯ�.�c����YN�*rSI�ȧ#+����DWJƳ#�,E����K|V�tk��#�K����V%bb��|l��= c�Aƞ%b/��T��ص���H,�b�>a�R��m�}%�~���6%~����7��Ge�c���-{C��9�>�D��xv$��������A�5T��D|�X"v���"��s2�"�n��/$J�ĳ#�,�b5���n!��8B�jr�.u����(
"�a"�1�8�s8�JD�ّX��r*ř�&�r���\���{�D��xv$�E��IJ�D5��V,GM�I	�X�(TW�R�
�gD�ّX�\�(ROW�n9���&�gD�x�T�1�N�
mc{ADT_�N�d�xVm���X��jA�_Ʋ��= �6dK�
r�>����#ړ 9β����SH��:�ß��M0>���]��u�]&�4:䀁�&�݀aR}���ۘ�� �&�0ڀ-�-����@�����n��� �8�4p� �h����It�}�f/��&��9����N�~%E�Jy�)g�S)S��4atY���P%�|�Ć'�WUb��Jh��@_����6�~�"�7`�'f��2��dՑ��v���N�LeNQg��7,��^�J"��@
�UC�CUFx�}��X�0nc���-�G�"|hK��(׫򛅫��T&`�V&�	����×g�OCVwb-�z{��Ȫ�^/�@��:\7w��у��1U�=w߈�5uA���Q���+`X [�F��?A~p7{���8rNU��,��5ȏ~�!��5��?�~Kt�����(����jb5n���Sjz5��U���km����Mٛ����9��<�@�V��58������i
��:��� ��%!�
�ku3K�t88?�0п�GX�ҩ�\�)�o���H��վAfܹ7͌��}��i�\6Ă�-�D4y3�4-����0��֜輞��?��`���6�}ԁ�c�4�&�ǲb>d2^�Rcm{oo�Ӎ�y΂�f�6p�g '������,}�?��MH}��Kσc�g���AOׂy��
��U��~/�SZ�|t��K� 7�)>�HӞD����R�����R}!6D�7��7���k?��F�-*��x~��l�[
�҇��]5��#Ƌ�E��r+����Z�/jDs�%���3�e)���u�P
��贪�B_]�ݖ�vf�_)��#ٝ��lv�B�����>��R��_a�4����Y��{����)���a�
�u�m���{gv��;�݉X8�氻����>�����>��qv�Ɖ&�v�a�wv�L�I$���nvkfb��	��ٽ�������v���)K���}��c���&�G�~���*Y���nyvkda�����Y�(蟅-�;��%2=["���%�)["gaK�,�?ς���Y��:�O�d��I+
��beT�U����|zܭZ-*���
�vC��}��a=沰\�X3+�3Z��kGt4��`���N�|t?U@��;�������Q����(�l��r�A|�-W���iW���W���Yι��|ǅig*�~�뺇�Օ�{��L׮��wa �V����#-���s�����n|���\�i,]��H�y��
�O]Q���]����_W�� �4����J=�&�z�ĳ#�,����J�3W��|�,����W]9'�K��"�FH�z��:7'������p�
�:�*��`s�J�����\��f!�&�qD6���ZN<�o�!m�r^�4�%f�Z��n�_]�=�o�J��zh[
04����0�G��o�'�Y� V`��6Rѱ �p�\#�u�Y�,?Z�U�B���^V}�D�p�Yyo��d%d�B
������i4��<|��;S�B�
t{�qOb�ukZ����8�m�Ҵ��7 ���P��iӆ�\vˆA6�u,�r�z��
��%o��_E�]�}]�2��v���	T���G�Z�������i�]�M�2�pT%�@
������o��jqhm#��sx�SP,��i֘}N��f�i
g ��p�h���:��`��o���xk�M��˟�3:���d'1�1t��X���������Ġ2^��E���{���o��z���N@��t�5}H��$�

�9��Ln��N!�M8o�-rn5==�UfƄ��8��j��8������o&�è/o��0�"�&`|���y1�������ux�����c��/�%�#��8��(��~0��E����_�hà}c+{F���)I�A��?�Z�g"ԓ��N0��g������e�d��: �K���[�&F^G[ Lan�h����V�T��`t�GV��zR�]���Ϫ�z������C4l15Öo���Xw1t� c�K�=ա0�����!�=
�~�@�������w�y��nb&�/`c��nb�9H#�p��]�4W�Y��Jsm�۴j��Jsk�;5�*�]�K��۰�,�5
?�T_S\Z���3���~?��n>�W�ȑ
!oq�)]Y�⏋�{)���9��/le�b41��͇�㪳�X7�g[݋��K)��$v��J���
�-{�v��R�?�������A��F<�o�Q#�1C���E)d�.�
9���R~x��͉��ɯ���ڬ�2�O/�K�&��KtC�ek
8[b&s�U^b&��<Gb&��(1
g��
����]}����A3�(��h�M�^w���6� v�;Q�gy ;���Y~�ƻ�CE��7�]a�(7~��Ȑs��ȢX@QT�٫����P��r$����xԈ[�!E���C�uc���(��\pFc�Az^�n7�CA�w��7\A�9�o��`]���e	�������2H�
J�v5̟��Q��^�t�1h�\��o,%ޠ�O��ⷀǌF�N����G���(.�7��ŧ��
����h���$$��(��c��L�ׅ��=�\��歀��ƈ�4�1h�X Q�D�ƈ?b'�v<|� +���׏��m<*}�y&G�Hjޠ�b9�*��o���
P�EN��6E����K��gB��>��m	)@����܆������|���m�H�sJK3��p��瀎$Լ
��{�����9p�O����8͇�ܽn^.�4FܶΧ|�y�C��u�|�'�P�
+o�-@6��߆�}�#����Y����sPhxM:{��mq.��&t0v�YIpû#��@��(��QL%�l�6���6#F����L���t6�t~�O��)��h� �Дg���������a }U��I~�Ӹ���8O�3���z�d@
x�-'wj3EA�h�v��wcr�42l��m<�&���bAj�ʘ�dc�/��'w�p������NQ'd�����<wF˳�d<-�|�]���Y�������'Z����F�s
�>iw�wnt��H��I<|��E޷�F��|����~˙�0�ͅ���8e���^C	�������Ӷ\��r/��g
�#@��#�I���<�l4��=��@��<{o�G���\Q�J�&<|����/@��,���3s��j.[W3R�V�Ln����V/&ǽuq���_yÖ�7�y�%��SѼ7z+���@��yt&��q@g�y��v��������ɢ���÷oJb���|����5�,�
�3yE�y�m�-�����d
J�&���/�c��e �;�-M&��c��dJ ����0'�O�d���>�r�A��C��M�r��%l�w�e\p4�O�����>�_[�C���lxٱj�ؾ- �^樛��'�OK�nn_���_Y�����%o�bY��I�_�e��R})K��#䏷���m<��8f����"u3[���rX1]�ֵF�ٍ�Ԭ�p���*�O[����M�W�[-3
p�e�ѢL��Đ��jY�`':�.vD��V�`W��4k7�����EA�Gވ�X�غ'ͨ�A\+�!����y�2|���J�	5Q�[d�;�-��RKl�(���8�[�4n��@#d;�o��5�~1^
��qWXN�Җ~hB��0=C߽[����g��
@�G-�@#�o��h��.Ҍn@�	dzoD�7�؈��\_���_I�H����r�����q�����L� �u[ΆXPhDN�)+e9I54��D�{%Zha�J4�i-��|�YhY;�VY._tZ!PM��,�J�|��,�g�J�g����S���W�2�ķ��N	Y/[���h`�4tA���ah^h��M�ЯM5^��:[��
�Pe�PI����
����+e���jj�U���s���V]%-^p!K���|��xq�#�E�m��x� �.^%-^�Ǩ��/�N%t���*i��x���*i�2x��U�୪�ZZ�Lޥ])-^�C�+��_U�W��t�Ws)��/m5��ȗ����m<E�C�}4��
���p5�C�9�3�d7Q��zA\nz��r~)Ϊ�֊a�BB�����,����0�6O���_֊aL�BN-e����B+����,h�R%�7w��VԆ��.����i���*X;�zh_�)��Fh)���	�Y��Z����X�����,�B����B[��;8���k����BOk���VBǴ��^v+����A�
��4tJ�S� ;��[S� ;��i��W�K���+��%tVb�`�z[b�`�zGb�`�zWb�`�zOb�`�z_�˲�X+�E��Z�<E��A|�o�oz��!��.�����ǵ�M]z�4�<4��/C[��_l���=�ס��-	Į ���C��e��k�����X��]"C]mxy��h{_���0��pp���2�+_X��&|���F���v	!~���y7~���/m���G����&��b�,���x�x#Z��S�|��h;��=p��������_-��*$x�x�CFsL�w�c���GwW�=܀a�F�-6tNcz�Z�6k�J9ήb�g��U%� 7`�� {�;�.-sW��C[B��_r�$�ߝg|a�w�+}���F1h}w�|�~$�W����_��7��������~��B�ݵ���
�D�.�#���D�7�=щPr{B{���e���k��Z@��M� h�Z���{�����t@��Ӂ��36Gw=�}F��x��s!����[��~�C�d�؋�������e!�n�\�Aӷ�V��vS8�C�`*9����no�_�y��[^�����#�j�����H3/^��e���r3ͻr�,wE�x;g�"����P�B���|��Ǜ@�Ѥ�b�H� ���6�h
3�qn�W�ő�9��M�"z����2U7�
�߫���{�p�9!��ްd@ao��{�� �Q_0$��lXB�ޱ2��5Y�_"��U�'o�z�s���~Y|a+��m���A�h%�R?:���Wȃ�>���?F{id2�Ґ��H�:^IX����(
�F��Àk�4h��A�&Nh'l��)޻������H e�Q<|�0�J�z��x������� }��A�h%l�@g�R���f�Mf{4�^c�LF)�n�6w/
O�d<�ѽ���
����~Z�Q� j'��2���}k��dF�N�yp;���)��u)%���;PW��)�_Vj�4�]3<|O��J>
LώĲ��������dN���K~o Գ+'|�wă�^K{��o|'N�
����x�z��T����wYF>��ʟr��*~�1���]����&W�h5���^���u��c�w�tN!vÝws<|mv�����~�'����t�
�Y�*@���a���0l����6ð}�g�Frz��V�b��=�&�v���eo߱7�px+7�Y-��#pJ�T��g8|��F�T�5W XK��K9�H��ś��,~��_Bl������@෌@��F��mwS�N&�_�c>=+k/�d&�9V��b{9FYՅd/����-@/����%��@�T������89���|���_$��k��W&f��Q �����ע��O��^x�-��c�>!��G�.'�0�F���6Ϯw�]�n�# ��(��9��i�kD|_�C2~��}	tŶvUw	��s:���� BD!ab�$&`��Q a2̃(�U�+���E��d�AT��g.��(\����]�'9��}�_���z�d�t��j�]�����]]��91���!E��t�G�aeb^�E��/\Cj�����E���9'C��ȤX/��S�`�?���`�q6�8��7#
6�V�|�����Y��9B:��C Gj��1�R����	�e�T7��N��$&��!,k
��7���龜7�.�u�
�XC���3���"�O��_}��7o�F�(���
ŕI1��w�p��d�������v>��Y�{|0^ϭ���
�_���&^����2T~��=g���/M��Z�	
]����15!��-R���+�n�XC5}����(N�=~;�xM�T��&sC�\��c'�}��9��~�|��!~[�?���x��J�.���Va�(Gs���9��&]-�qR��ͨ7L��`lxI�ї���<ն_�xY	/]�Y"MZ�Vü�?^�{|0>\h>��IF �x�+t��g�ԞF��"5�k��uo�ćSj��ױ s��1��0��NM�OD�M��U�$��S��G�dWsV�WP�(��Q����!{5J��Җ�D�Q�q6I�c��4����{Ò[�=~ ��&e��R�gN'���2rG)1����+��~�*�wl��\���w�{|0X���W;�2J�h��
!��Rץ�-�j6ҷ�|K1�[�- ���b���+��.�!O�i��}����gF����|JY��k����q�8��N4��2I�/"�6Yw����@N�dd�e�Su���Z�lvM���{0k��y#�F������]l�5�;OQ,e4����;q;�t�}ձ��>��8��}�vB<e�?������݁k�v ��c�8��y�A�7S$u�w� ���9���F��A��c<�7�g�] �A:O��Aj��Q��� ���>�Nm��Zg�0)y-�}�uj-ʸ�n��q�F	�异�����e���|�#M��N�H�<�pP�V�}���� ��[�����[��'�ݥ�}�9�}��uj��:�ѿv�C������#�!:�k7_��D^�N䵼���M\����q0��K��(��sʇ�*R\�ŚkUj�+��l�Hm��b3vj�8�����;eh�HMq�V�BIgj�y�% �ԅ��ڬ�3�z5���)FD�Z�;���	�L9b�$�����:��X�^WZsb�X)=�ҟC:|)����=>U��o�IU��|���#Tt�+8~0���6ѝ�Mm�k�:��ݾ���W�jh���W�x�������z�lP��d݇�cP=c�:l�?S"�SR���A���7��)%�/��oX�GH���x�1����-7�ɖ?�'[r���<�G�7����(�<R�1�mQ>E���Æ
�:g�Fm�C�
�ok�F�6�yc�q����F��2����2�G4��$�J"C������:O|pQ��u�P��;��&K��"�����H_9���`�i!۷��K"0Q\F��;Z�fx�|�Cn7�.��o���wLX�f2�d�!�x�b����3~(��Ds�v��'��K�2����Mʥ~d�.m�X���%�@`�l���H�l�?����P�.vn$�K�Ļ37�Qb�u eL1O|��Ɣk�1ݬ7|�$a�0G<��n5�Tͯ�V�FG�3MH��JO�wp��r����,��f�G(������S·�P��K\��#k_��Q1������okҝ�`-7󇛛y)��
�hh1f��'/#t2�Ҹˌ���˹橧�H˅�g�lQM����ϠGe�\�Ǆ
3���Ek%lޢN��'�oA�G|�X��Q� ��Y��T����-|�5��hH1o��U!^�;~�.�XR�֡��f�J�'��>m^W����Qzem!����2�ݔ!B�
����J�F��S�A�hf�S_��\jxi�/���y�=1��W*^L�	�����i�]Ц�7Sjh�*^���8�Ќ7��0xR�G��*2��T{�U�mv9�ي���O"|!����k��Vz��;����DƫĜ�!˅�+�9������Ǒxҫeᕘ�X�e��2׵�����q��xlG�N���[4�\�woC�j*D���!��6��m� \�Y'�P��)��!Y�g�����^A
�1I+��Q�(���Ѭ�Yn��U;aP�e��w�������B��Y�x�Z����o��%ِA�w�H�)�_���U�"�����Y�0�y����*d~dzf7���ً#{��(�H�0�*�g�'E��q:#wdͫ��	�W�f��m|�E�
I���eNܞ�%W ٮ�3�p��*.H�[x"	��Q ��JjFm��D��t�H��>{|D��9��j�\�pF��](hF<�	�v+��Ʈ������͔�X�zG�YW�����Αߧ��a��W(-k��3D��N�)y!�R�\	b�N��
%�}����aV�Ne���%��^���NIۥ��q�����HY9==)��h�*f�!�e󀹴H,Di�� R5�a{��J4�K@��]�eJ(�_�X`�:}tR�~J�~�J�)w;���]��3�-"��{XiQ�7UD��p��Qsg8/�x��T�Yry(�y��3�Rs[@>���]i)���\^q�'6�*b���μ�9� ȳF��Y�+��c�H�S�ә~�j���D�d/�MQ���f��]a�S��)����
��k�i����X�)�	�7�\�ˏ��3dw��u6�z/���q���6f�T�{���N^&��Jc�n�c�6�}�N�3<����x?T�B^��Q��Q~�P�٬qmB���砱.9.�A��y��/��٭�6~@��������&V����o��1�]~���) ���|����@/��F��v9]@�E�|�Wn6�,�%�r]yY�Më0T����h��,��Eu$Ȣ�VOP��[��W�`Ɲ��D~p⻤��4ޭ���"�{ɽ_��v�(k�`M�ܻ�>��%��Uy�Z�x���곾��m�����怢!m.�yV���F����2��x-S�e^�练4���>Yɋ�{g��f�Z�t_H\}I�H���
F�9q�z�1�"=�%�
�^D�,��ç�������x�
���1d^Z}��y@�����:���I���H 0}a}|�|PV�Cz��=�<>YE��Ew�ۤ� ����=:
u���!<�W�}���u�����Ѭ��xܿ������B,�I�u�Y�0��̆
{\CA�v���%�\ʔ�!c޻�!JR�$���,����Pr�?�Ӆ{���̇��gd�@P�>�<̞[��)8���|�M_�k�{J\�Ç�;�M��ҍ�u�Z��o&�w��Ѯ�V�˻��:��b�%�8ؓ\ح����������8�3�ӵ�Tg��
�	 ���+�.�w��.�E'�������`�a�w�
�)�Q?i7�V�C)%�44�&9W$�����!.�'t߄�1�@����MA.s;��Ă�u�+����`_�eDùn&>90\FP>!�sbD�r�Ft'�j�X7�F�φ���|܀XX�
� �9��c�	 n>����F:8z��0���b�h��,�NHʋ�	�!?��'�����v]�2J݃�0�H�ep���T��)Dp)�/��[���V��e���Ns�v�2��^P�73e+}S��E�����#��jҿc��M��������Y��6�7��KQA�ݠ�**�}�<E���u��<���+*�-o���wP�lR���+*ɝ�I��ȝ	�)E5q�zAq6w������w�Z�T��u��Z%���8�u��p/�^Q]ܫAmPTw�6P�ӽ�&E庿 �:j�H�s��\}Fm��3����6g_#c��.�'ç6�f�j_M�Dzf�UZ0�KĄv-��B�ӿ�/�$��p�ӂ&
�IS�����UHW�H� k$� Y�t�e�,�����b-.������m�B�:�kt
�k����p��e����U>a�:1�5�W��yD�&��A~d�l�y����l� �N�i����Av1蟌���>�6��g��w��M�?.�Š/��%�~�%M� ��:�QaPR)��E~��أ��=������=����谷y�G�5���3U�k@��<��]��̩j"��r�y�S�ڥ o5�|ڷ�,3U���9J����ovP7��b_ނ���T���z�h�w)%��,AZ�� YKK���i�I*�S�{v��5Y��?TG� M��j�>I��H��U������ \uז�ݵ�owm��][�vז�ݵ��]�]4��������ÐvR���� �k�z�!��l[{)��A�C{-�N�}�j�7@��j��iW�$s�# oԚ��� s4Yh�Y�3*��G��v�"�t����E�+�[j79@f1Yn��,�'����]c��%T��[@�t��KA�cC�)I�D�#4}^ڳ@���þt��w�a��;Bկ��#�\�it�a?z���3��'h�y�~�DM/5�=�'i��>	z��o�az��h��4l�v�q=�����gi�����.�o�a�=W>����	z��_5�����V�.=_���k�=�M�a�3A߯�W6~F���l���M��(�4~��^�YͿװw`Z[��=h��~N�G�9&˥��а��D�飆������0l�4���ӆ��Z+�
z�SV�nӟ�k��_2�{��W�a��"�Urd��%C��.�X��%C{��2�R�dhO�Gv��/����+o��/ڋ@�+,�K������/-�K��3��o,�K��
���A"�ʱ��s[I�{�z�ŦH�`Ymv�iȺ�z=6i��saW��tj
�z5��w�N�\"�
F�v�F3xWG��u5X���&��C��ھVKe�pw ���wOP��B�ۀ���^��j��XR�.G���y�Sy�tG�[m��T�L�X�b�˓�_���9�c@ݰ�����k�����
.ܝ�Z�F^:7�#(���" ��k��j1��*8H�[%x"q6�����%u�#�m�����ym������^D�!�4�����u�yډ��3k�w�?��[8�#R��>�"������7C&���mPF݃���cZ�%6�c�l��Y��e���\�8����߂�!�R�����-*���{��H�#0��5�{~�c��H
�	�9�f��{_�ي��1	DS.�r�*Jb�wa��y�s1W�<�
-�8Le�d�%�	"x���z�RV�!�U9��H�J�`����P%�� �/;@����h���q�F����`������j�۟�mI?�p�.�p���gn��p���;s�|��q���ξ��[}���:s��?:s��:s��܀37��
-Uq�W�&-�Xo:����d
z+�f�D>��ݚ0g�C�<���R��ܮr������t��WA�VNO�e�*I�1S;R�߫��7L�~ÓG"�D�7��h��� �o� bX]<�c��k)��W�������'<��`�3�<��`�3�<��`�3�<��`�3�<����g0��!�yo���r<Z�{;� [��K�
"YY���n��E�p�u��͖���m��u��"���pQ���n�{n���-�f��n���-�f��n���-�f��n���-�f��n����?��V�Y]!�嵡哇
��!�B3l�Kڤ���^ۤ��ؿ�L
�J�h+�iPM�����S�p��d�E��0�\F�:��h$�k�St�/z���I��������g�3y���)��QW}�|�B��r������p��>�)�&��A�àr"w����!eo���Oa�"a(�O�
(Z��Z���}9�(�ypqb�)L�ł$�#Y�����h(᥇�4
Iq�H KD��H�e�v[��V?X��ݖz��\���r��'��`�i���zB�
��<ۋ5ܖ�ܖ�e�mp[ܖ�e�mp[ܖ�e�mp[ܖ�e�mp[ܖ����eX�Hj0i[˧Q)�5l��f
ޔ�6
ޒ�
ޑ�>
vH�;��	U�:I�.i��`���S�GZ?S�OZb���B�iy(x[ZQ�V}
J+��w�Ռ�CҺ����jK�iu��=ieR�zQ���
)�PZ�)�HZ�)��z�HkG�5��HkǤ5���ҚG�	i-�ऴ�����F���ZB�ii���Ϥ���ϥ���/��g��_Jk7_I�g��1�u��J�+
���w|#�_)8/-9M���
(�DU@�e��i�-��u=�7U _n���]d��!�{Z��/�
PP"m������<�с�#��5�$]z,��;r�E_��8�ՓOk�NkL�S��Տ��q���,Y��?��2S����D'�i�$8�_�y-�|�W�n�46����XE��,��X�Zt�W�!-<��:�2���|����0J���2!W94<� DH\�G[�Pe]%�=�^�KtF��f�U�y�nU��?��M�A�| �| 蠄�t��m�N䮢�"y>e�b��t�X*��+��ꨝ�)�Oc�+����]�{��1���*�v�H>Bj�:�_�Z�Ζ�j��#6S���3ZS
�yF�s>�=��A��')���Ǝ�[����>Wq��A�>��!Y��d�!Ӵ�i�׊`C�1[Qۘ����"Q���b��X�G���v�ѵ��>t�^A�h�����I)��LdE��(i#��{�֪��1B`(�
T�T
mܓ�mژ��m��g�:.��DJ=!.�q:�C�B��ą6r޺�I�hc�nQ..�C�B?�Kh�ƸI�&m�w�����w�ؐ�{s��
��kE �4������d����^*>�L���K��hq#��э�c�a
��SsV@̾�t�N�Ky��m�����]P+iՇQ�
h�rhٜ
�
\��Rje��	���T�[�E_�Z%��^)�F�,�!eR��$<�ۥ����XK��	M���R�2S%؏}�Z�>�rM�V��Zu��5Ȗ��~,���;��c��N�ґ�sA��'iHi7��^��ե��j7v!7��x$]'�4��Me����ZVWF��zb֓��,p�aH?S�-b�C)�YԂ3W�v/g�v/c+��j��B��J7UR%��v/�=<[%x6����J��qn��������N���������-��>��Y��N���C�˴I��1u��� e�K/{��s���QV|�g�tJY'�
+�uE@9�٠��]P�K;�����n2)�&��>�e}&@YwtJY������������)k�AYۿb�Z�e�ԣ��p6|	e]��P�e�R��e�����? e=�k������Q֑ �ovBY���u�IY?�?Q�-�P�z���0)k�IY�����K)������BYW:e��춼��ۤ��M�z�IY/6)�]&e}٤�-&e��IY+M�:ä�-�HY�e�����/���|�5BLu������
P�;��[Lʺܤ�����T�������K)k�IY��#��ݤ���e�4)�H���1)� e������� e�"@Y�8e]�S����� em�7S���P�[��=@Y�BY��7R�M����uh���P�{��8@Yk�ua���4@Y�(��]R�S;��k�������u������C?eż��'��GYgky����_�)�M@�p�l\ґ>ʺ)HYw)k����͠�mem;$��4(�Ў�u�AYot�b1x�쎔u�AY�t�k�OG�:ݠ�o��W@��#em3(k�AY���fP�6��>iP�W]�� j��HY��z��2	#em3(k��Z��?�HY����R����ߑ��7(�j������)����z$
ؗ�y	�W(�F�W^����:�l+�:�`Q�}o$b������\�!��p�V�+pM���]K�z5���-:�����eg��M�&�6S~:|�Y��e���1e�\6�R �����H� M��,����J]�ۋe{�aP���=�~mӨ�i��
�e�a&˝���˝�L�(��9��t&�Ҡd��I�$jQ+-jU`z=/0�$^z�Hڧ"�p�.��䪫]A�hZֵ(�n�����ަ��a"��2WS�cKo@1k��ɥ�\A��F�CF�'�Fҽd���� ��ιW��K�0)���Ԕ��'L)����.w����P!r��γ��TNW�Aɗ\G�sLr�'LH��.=*�~��OɛH~C�"����S�Z��	茼Fgd����[�	���K�1�T��t��O�E~�?���?�,4�i�?�[L��#�x,��/^���o1�ɌV�� eoU�i1�Jm�.;±������I���:[XI�P�*�����X�B��41E&'iH����I�rr�"CǦ�IcR��Ƨ���ĳ�ð�:��H�j���4�nFC�nR�G�~j�󦤨���prթ(1�6�I� �)k�|�٩&�4>5�'5Z��ڶ�;�W|WG'`�3_�ȍ���;���X�DX?�u�n,�|EE��g�qS����W\��U�Wt�K���9��q�7��t��:]ь�+��~���Wd㗿=�zZ�K�io^*,*�t>�yQ��FMz
=��RaQ��e�TXT��\��SN����4*��^*�Ԥ�� =�
=���4��Q���~���i�#=�����[*,*�t
O�d��ÿ�D�mᝢF*��=���zP�u&�Q
�lD�;�s�X�(/Ѩx��-R��BϧB����.D���5s����_�i/9u�zE�8��Y�.��F�o	w��x����T
��n�	\�z*elޗ·wEO��
țω`�ֽٯ81-�"�:��Df�q1��\� ����?H��1
?�-:��+������ag]�k'�?���C,��	��g)�NB�!K	{ �
M�Bi	��0+�[�RC�Q�u<�
FT}�����z<�>����x1���*:h����"}���w�����'I/��
95�{��H���6_�vH+X��o@������ mȌ�5���h�'�#�<^��{'�'9]1�������?"���Fp-�g^�}G
Y��/�1]&f#��X�]���%$������#���q��H��&�o���P-��o�j�B5[�a2Us9Ws�V���\�~��*��e���9F5W:�7gc�heO�'�nw���P�i��v�/%�
{�ﭔnξ
�H
g�o"�U�{�Z�������l��9_�Uɵ,x#�}E/�:���jӊ=d�>l�v񖎬�>�]����c�z����&���-5C��z�����[�79u�|Oj����S[���^u�X���Γ���������a}a�ٻ��k�g�"x ���IT^~jQ�FĊV*� /���WDMDRQ��X��� �j�T��+*V,>��"|b�7�����f�=[��}���?�GN�z̚�f�^�����zOcS����B�N�G�/�Q�����\�z_��F��B���}P%y_JQ�lD[��LϬi`�>?�}2�n�(�>YN�/�p���O|Χz%¤��4�Nqº���aM��1�|���)�7�<�����̬�]������SԸ
d����]^�.40�.TN�DBՕg6�:q}XE�P�[1�15�z������I��"z/�xZs��7[9�ʗ�8��Q����<P&(!�>�
ni	e��J'���PV9�<lC9�xQz� ���l;)�f�pW
2?��W�ߍ��JU+�Ek�����|��f���:`��b�Wӡ��.߶G&��m2!����֘ĂX�4�K�c����HGW�Y"�'�7��wὟ^�~\B�Bv�+��a�KP���b�����6<�r d�a�Vͦ���L�ҏ��\�Ԅ�vnȐGة�!�����Vg�o��i\�&*CQk���P�`�ټՖ<���h��j��EE^!fG^�
���x�S~�I�]��
IBQH�B�P����$�$�($	E!I(
IBQH�B�P����tP�a^��Q����tPn��UFQH�B�P���z�{����U�P;�<�̾j����H�7Lܦf�8�����B�,p��S#-�y��H��.ptl���v��e�sNգe�3������G8wp=��ai�v8Z8	�����-p�,p�-���-p�,pX~�ұ�����h�4�]�hY�4r���a�����B�U8or����*�Xe�s\�*n��Z8�H�[��F"k�,p���kY�pف�]��o�/<S;\x��Ѳ��-��]�hw��������x��,p� l��i�����0q��`~��-�
ڂ�]{�ݵ��]{�ݵ��]C�-h�0�]L[�b�jmA��F[Ђ��>������]��b�j�V�h�E[Ђ����ӂ���Ꝣm�i"ghA[X hZ�^ˑ�-hLoVZ���0ڂ���*-hL��umA���F[�1�C[�1�C[�1�C[Ђ��-�ڂ��-�ڂ��-�ڂ��-�ڂ��-�ڂ��U���c��:���ch:���ch:���c��:���m!��h:�i�c��:���mA�2�B�����-�h�.ڂ��-hA[H�2ڂ��-hA[�>����-��X