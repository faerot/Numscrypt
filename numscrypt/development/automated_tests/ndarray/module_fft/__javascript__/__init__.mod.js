	__nest__ (
		__all__,
		'module_fft', {
			__all__: {
				__inited__: false,
				__init__: function (__all__) {
					var sin = __init__ (__world__.math).sin;
					var cos = __init__ (__world__.math).cos;
					var pi = __init__ (__world__.math).pi;
					var transpiled = __envir__.executor_name == __envir__.transpiler_name;
					if (__envir__.executor_name == __envir__.transpiler_name) {
						var num =  __init__ (__world__.numscrypt);
						var fft =  __init__ (__world__.numscrypt.fft);
					}
					var fSample = 4096;
					var tTotal = 2;
					var fSin = 30;
					var fCos = 50;
					var getNow = function () {
						return new Date ();
					};
					var tCurrent = function (iCurrent) {
						return iCurrent / fSample;
					};
					var run = function (autoTester) {
						var orig = num.array (function () {
							var __accu0__ = [];
							var __iterable0__ = function () {
								var __accu1__ = [];
								for (var iSample = 0; iSample < tTotal * fSample; iSample++) {
									__accu1__.append (iSample / fSample);
								}
								return __accu1__;
							} ();
							for (var __index0__ = 0; __index0__ < __iterable0__.length; __index0__++) {
								var t = __iterable0__ [__index0__];
								__accu0__.append (complex ((0.3 + sin (((2 * pi) * fSin) * t)) + 0.5 * cos (((2 * pi) * fCos) * t), 0));
							}
							return __accu0__;
						} (), 'complex128');
						var delta = __add__ (0.001, complex (0, 0.001));
						var cut = 102;
						__call__ (autoTester.check, 'Original samples', __getslice__ (__call__ (__call__ (num.round, __add__ (orig, delta), 3).tolist), 0, cut, 1), '<br>');
						if (transpiled) {
							var timeStartFft = __call__ (getNow);
						}
						var freqs = __call__ (fft.fft, orig);
						if (transpiled) {
							var timeStopFft = __call__ (getNow);
						}
						__call__ (autoTester.check, 'Frequencies', __getslice__ (__call__ (__call__ (num.round, __add__ (freqs, delta), 3).tolist), 0, cut, 1), '<br>');
						if (transpiled) {
							var timeStartIfft = __call__ (getNow);
						}
						var reconstr = __call__ (fft.ifft, freqs);
						if (transpiled) {
							var timeStopIfft = __call__ (getNow);
						}
						__call__ (autoTester.check, 'Reconstructed samples', __getslice__ (__call__ (__call__ (num.round, __add__ (reconstr, delta), 3).tolist), 0, cut, 1), '<br>');
						if (transpiled) {
							print ('FFT for {} samples took {} ms'.format (tTotal * fSample, timeStopFft - timeStartFft));
							print ('IFFT for {} samples took {} ms'.format (tTotal * fSample, timeStopIfft - timeStartIfft));
						}
					};
					__pragma__ ('<use>' +
						'math' +
						'numscrypt' +
						'numscrypt.fft' +
					'</use>')
					__pragma__ ('<all>')
						__all__.cos = cos;
						__all__.fCos = fCos;
						__all__.fSample = fSample;
						__all__.fSin = fSin;
						__all__.getNow = getNow;
						__all__.pi = pi;
						__all__.run = run;
						__all__.sin = sin;
						__all__.tCurrent = tCurrent;
						__all__.tTotal = tTotal;
						__all__.transpiled = transpiled;
					__pragma__ ('</all>')
				}
			}
		}
	);
