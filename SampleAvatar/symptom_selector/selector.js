/**
 * ApiMedic.com Sample Avatar, a demo implementation of the ApiMedic.com Symptom Checker by priaid Inc, Switzerland
 * 
 * Copyright (C) 2012 priaid inc, Switzerland
 * 
 * This file is part of The Sample Avatar.
 * 
 * This is free implementation: you can redistribute it and/or modify it under the terms of the
 * GNU General Public License Version 3 as published by the Free Software Foundation.
 * 
 * The ApiMedic.com Sample Avatar is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY;
 * without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
 * 
 * See the GNU General Public License for more details. You should have received a copy of the GNU
 * General Public License along with ApiMedic.com. If not, see <http://www.gnu.org/licenses/>.
 * 
 * Authors: priaid inc, Switzerland
 */

var keys = [
    "litTermsOfUsePolicyPrivacy",//disclaimerText
    "litDisclaimerNotChecked",//disclaimerNotAcceptedText
    "litAddAdditionalComplaints",//noSelectedSymptomsText
    "litEmergencyInfo",//diagnosisMessage
    "litEmptyDiagnosisDataTemplate",//noDiagnosisMessage
    "litSuggestedSymptoms",//proposedSymptomsText
    "litCarouselItem4",//symptomListMessage
    "genAvatarText",//skinText
    "litYears",//bornOnText
    "litSearchSymptoms",//typeYourSymptomsText
    "genSelectSymptoms",//selectSymptomsText
    "genSelectedSymptoms",//selectedSymptomsText
    "genPossibleDiseases",//possibleDiseasesText
    "btnGenerateDiagnose",//makeDiagnosisText
    "txtProfessionalName",//litProfName
    "genShortDescription",//litShortDescription
    "genDescription",//litDescription
    "genOccurrence",//litOccurrence
    "genSymptom",//litSymptom
    "genFollow1",//litFollow
    "genTreatment",//litTreatment
    "litPossibleSymptoms",//litPossibleSymptoms
    "litTermsOfUse", //litTermsOfUse
    "litPrivacyPolicy" // litPrivacyPolicy
];

var disclaimerText = "";
var disclaimerNotAcceptedText = "";
var noSelectedSymptomsText = "";
var diagnosisMessage = "";
var noDiagnosisMessage = "";
var proposedSymptomsText = "";
var symptomListMessage = "";
var skinText = "";
var bornOnText = "";
var typeYourSymptomsText = "";
var selectSymptomsText = "";
var selectedSymptomsText = "";
var possibleDiseasesText = "";
var makeDiagnosisText = "";

var litProfName = "";
var litShortDescription = "";
var litDescription = "";
var litOccurrence = "";
var litSymptom = "";
var litFollow = "";
var litTreatment = "";
var litPossibleSymptoms = "";
var litTermsOfUse = "";
var litPrivacyPolicy = "";
var resObj = {};



/////////////////////////////Optional parameters//////////////////////////////////

/// Path to priaid webservice
var pathToWebservice;

/// Only for internal use
var currentPlatform = "webservice";

/// Required language
var language = "";

/// Security token for webservice access
var token;

/// Specialisation search url
var specUrl = "/specialisation";

/// Include always all specialisations for custom urls
var includeAllSpec = false;

/// Use redirect mode instead of selecting body parts
var redirectMode = false;

/// Redirect address
var redirectUrl = "";

/// Terms url
var termsUrl = "/Terms_en-gb.html"; // Your terms html page

/// Privacy url
var privacyUrl = "/Privacy_en-gb.html"; // Your privacy policy html page

/// SelectorMode : diagnosis or specialisation
var mode = "diagnosis";

//////////////////////////////////////////////////////////////////////
/////////////Symptom selector plugin start///////////////////////

(function ($) {

    var _plugin;

    var selectorStatus =
        {
            Man: "Man",
            Woman: "Woman",
            Boy: "Boy",
            Girl: "Girl"
        };

    var Gender =
        {
            Male: "Male",
            Female: "Female"
        };

    var SymptomsLocations =
        {
            Head: 6,
            Chest: 15,
            Arms: 7,
            Legs: 10,
            Hips: 16,
            Skin: 17
        };

    var _childAvatar;
    var _womanAvatar;
    var _manAvatar;
    var _childAvatarSmall;
    var _womanAvatarSmall;
    var _manAvatarSmall;
    var _symptomList;

    var _yearSelector;

    var _selectedSelectorStatus;
    var _selectedBodyPart;
    var _selectedGender;
    var _selectedYear;

    var d = new Date();
    var n = parseInt(d.getFullYear());

    var _defaultAdultYear = n - 25;
    var _defaultChildYear = n - 8;
    var _edgeYears = n - 11;

    var _statusLinkBorderColor = "cccccc";
    var pathToImages = "symptom_selector/images";
    var symptomListId = "symptomList";
    var _diagnosisListId = "diagnosisList";



    var methods = {

        init: function (options) {

            return this.each(function () {
                _plugin = $(this);
                pathToWebservice = options.webservice;
                language = options.language;
                token = options.accessToken;

                if (options.specUrl) {
                    specUrl = options.specUrl;
                }

                if (options.includeAllSpec)
                    includeAllSpec = options.includeAllSpec;

                if (options.platform)
                    currentPlatform = options.platform;

                if (options.redirectUrl) {
                    setCookie("selectedBodyPart", "", -1);
                    redirectUrl = options.redirectUrl;
                }

                if (options.termsUrl) {
                    termsUrl = options.termsUrl;
                }

                if (options.privacyUrl) {
                    privacyUrl = options.privacyUrl;
                }

                if (options.mode) {
                    mode = options.mode;
                }

                _ajaxGetSpecificResources();

            });
        },
        Resize: function (options) {
            var currentAvatar = _getAvatarByStatus(_selectedSelectorStatus);
            _resizeSelector(currentAvatar);
        },
        Select: function (options) {
            var currentAvatar = _getAvatarByStatus(_selectedSelectorStatus);
            _resizeSelector(currentAvatar);
        },
        GetSelectedSymptoms: function (options) {
            return $("#" + symptomListId).symptomList("GetSelectedSymptoms");
        },
        Unbind: function (options) {
            if (_symptomList.children().length != 0)
                _symptomList.symptomList("Unbind");
            if ($("#" + _diagnosisListId).children().length != 0)
                $("#" + _diagnosisListId).diagnosis("Unbind");

            var avatar = _getAvatarByStatus(_selectedSelectorStatus);
            avatar.mapster('unbind');

            $("#prefetch .typeahead").typeahead("destroy");
            _plugin.unbind('click');
            _plugin.empty();
        }
    };

    $.fn.symptomSelector = function (method) {
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        } else {
            $.error('Method ' + method + ' does not exist on jQuery.symptomSelector');
        }

    };

    //////////////////ajax calls//////////////////////////////////////////

    function _ajaxGetSymptoms(initTypeAhead) {
        $.ajax({
            url: pathToWebservice + "/symptoms/0/" + _selectedSelectorStatus,
            type: "GET",
            data:
                {
                    token: token,
                    format: "json",
                    language: language,
                    platform: currentPlatform
                },
            contentType: "application/json; charset=utf-8",
            cache: false,
            async: false,
            dataType: "jsonp",
            jsonp: "callback",
            jsonpCallback: "fillResults",
            success: function (responseData) { fillResults(responseData, initTypeAhead); },
            beforeSend: function (jqXHR, settings) {
                $('#loader').show();
            },
            error: function (xhr, ajaxOptions, thrownError) {
                if (window.console)
                    console.log(xhr.responseText);
            },
            complete: function () {
                $('#loader').hide();
            }
        });

    }

    function _ajaxGetDiagnosis(symptoms, gender, year_of_birth) {
        $.ajax({
            url: pathToWebservice + "/diagnosis",
            type: "GET",
            data:
            {
                token: token,
                format: "json",
                language: language,
                symptoms: JSON.stringify(symptoms),
                gender: gender,
                year_of_birth: year_of_birth,
                platform: currentPlatform
            },
            contentType: "application/json; charset=utf-8",
            cache: false,
            dataType: "jsonp",
            jsonpCallback: "_addDiagnosisCallback",
            success: function (responseData) { _addDiagnosisCallback(responseData); },
            beforeSend: function (jqXHR, settings) {
                _loader.show();
            },
            error: function (xhr, ajaxOptions, thrownError) {
                if (window.console)
                    console.log(xhr.responseText);
            },
            complete: function () {
                _loader.hide();
            }
        });
    }

    function _ajaxLoadProposedSymptoms(symptoms, gender, year_of_birth) {
        $.ajax({
            url: pathToWebservice + "/symptoms/proposed",
            type: "GET",
            async: true,
            data:
            {
                token: token,
                format: "json",
                language: language,
                symptoms: JSON.stringify(symptoms),
                gender: gender,
                year_of_birth: year_of_birth,
                platform: currentPlatform
            },
            contentType: "application/json; charset=utf-8",
            cache: false,
            dataType: "jsonp",
            jsonpCallback: "_addProposedSymptomsCallback",
            success: function (responseData) { _addProposedSymptomsCallback(responseData); },
            beforeSend: function (jqXHR, settings) {
                $('#loader').show();
            },
            error: function (xhr, ajaxOptions, thrownError) {
                if (window.console)
                    console.log(xhr.responseText);
            },
            complete: function () {
                $('#loader').hide();
            }
        });
    }
    function _createSearchField() {
        var searchField = jQuery("<input/>", {
            "id": "txtSearchSymptoms",
            "class": "typeahead",
            "placeholder": typeYourSymptomsText
        });
        var searchContainer = jQuery("<div/>", {
            "id": "prefetch"
        });

        searchContainer.append(searchField);
        return searchContainer;
    }

    function _createYearsField() {
        var ddlYears = jQuery("<select/>", {
            "id": "ddlYears"
        });

        var d = new Date();
        var n = parseInt(d.getFullYear());

        for (var i = n; i > (n - 100) ; i--) {
            var opt = jQuery("<option/>", {
                "text": i,
                "value": i
            });
            ddlYears.append(opt);
        }

        ddlYears.bind('change', function () {
            _handleSelectedYearChanged($(this).val());
        });

        ddlYears.val(_selectedYear);

        return ddlYears;
    }

    function _handleSelectedYearChanged(selectedYear) {
        _setSelectedYear(selectedYear);

        if (parseInt(selectedYear) < _edgeYears) {
            if (_selectedSelectorStatus == selectorStatus.Boy || _selectedSelectorStatus == selectorStatus.Girl) {
                if (_selectedGender == Gender.Male)
                    _setSelectorStatus(selectorStatus.Man);
                else
                    _setSelectorStatus(selectorStatus.Woman);
            }
            else {
                _makeDiagnosis();
            }
        }
        else {
            if (_selectedSelectorStatus == selectorStatus.Man || _selectedSelectorStatus == selectorStatus.Woman) {
                if (_selectedGender == Gender.Male)
                    _setSelectorStatus(selectorStatus.Boy);
                else
                    _setSelectorStatus(selectorStatus.Girl);
            }
            else {
                _setSelectorStatus(_selectedSelectorStatus);
            }
        }
    }

    function _highlightBodyParts() {
        var currentAvatar = _getAvatarByStatus(_selectedSelectorStatus);
        currentAvatar.mapster({
            fillColor: 'acacac',
            fillOpacity: 0.3,
            //isSelectable: true,
            clickNavigate: true,
            scaleMap: true,
            //singleSelect: true,
            mapKey: 'accesskey' //  (see http://www.outsharked.com/imagemapster/default.aspx?docs.html)
            //stroke: true,
            //strokeColor: "585858",
            //strokeOpacity: 0.8,
            //strokeWidth: 1
        });
        _selectBodyPart(_selectedBodyPart);
        _resizeSelector(currentAvatar);
    }

    function _resizeSelector(avatar) {
        var avatarHeight = _plugin.find(".avatar-container").height();
        if (_selectedSelectorStatus == selectorStatus.Boy || _selectedSelectorStatus == selectorStatus.Girl) {
            avatarHeight = avatarHeight * 0.7;
        }
        avatar.mapster('resize', 0, avatarHeight, 100);
    }

    function _selectBodyPart(location) {
        if (location === "")
            return;

        var currentAvatar = _getAvatarByStatus(_selectedSelectorStatus);
        _setSelectedBodyPart(location);

        // use try/catch to hide image mapster child resizing problem
        try {
            $('area').mapster('deselect');
        }
        catch (e) { }

        switch (location) {
            case SymptomsLocations.Head:
                currentAvatar.mapster('set', true, "0");
                break;
            case SymptomsLocations.Chest:
                currentAvatar.mapster('set', true, "1");
                break;
            case SymptomsLocations.Arms:
                currentAvatar.mapster('set', true, "4");
                break;
            case SymptomsLocations.Legs:
                currentAvatar.mapster('set', true, "3");
                break;
            case SymptomsLocations.Hips:
                currentAvatar.mapster('set', true, "2");
                break;
            case SymptomsLocations.Skin:
                currentAvatar.mapster('set', true, "0,1,2,3,4");
                break;
        }

        if (redirectUrl !== "") {
            setTimeout(function () { window.location = redirectUrl; }, 500);
            return;
        }

        if (location !== "")
            _fillBodySublocationList(location);
    }

    function _fillBodySublocationList(location) {
        var options = new Object();
        options.LocationId = location;
        options.SelectorStatus = _selectedSelectorStatus;
        options.Gender = _selectedGender;
        options.YearOfBirth = _selectedYear;
        _symptomList.symptomList("LoadBodySublocations", options);
    }
    function _showMainAvatar(selectedStatus) {
        var avatar = _getAvatarByStatus(selectedStatus);
        avatar.show();
        _highlightBodyParts();
    }

    function _hideMainAvatar(selectedStatus) {
        var avatar = _getAvatarByStatus(selectedStatus);
        avatar.mapster('unbind');
        avatar.hide();
    }

    function _getSmallAvatarByStatus(selectedStatus) {
        switch (selectedStatus) {
            case selectorStatus.Man:
                return this._manAvatarSmall;
            case selectorStatus.Woman:
                return this._womanAvatarSmall;
            case selectorStatus.Boy:
                return this._childAvatarSmall;
            case selectorStatus.Girl:
                return this._childAvatarSmall;
        }
    }

    function _getAvatarByStatus(selectedStatus) {
        switch (selectedStatus) {
            case selectorStatus.Man:
                return this._manAvatar;
            case selectorStatus.Woman:
                return this._womanAvatar;
            case selectorStatus.Boy:
                return this._childAvatar;
            case selectorStatus.Girl:
                return this._childAvatar;
        }
    }

    function _setSelectedBodyPart(selectedBodyPart) {
        _selectedBodyPart = selectedBodyPart;
        setCookie("selectedBodyPart", selectedBodyPart, 1);
    }

    function _setSelectorStatus(selectedStatus) {
        setCookie("selectedSelectorStatus", selectedStatus, 1);
        _hideMainAvatar(_selectedSelectorStatus);
        _clearSelectedStatusMark(_selectedSelectorStatus);
        _selectedSelectorStatus = selectedStatus;
        _showMainAvatar(_selectedSelectorStatus);
        _markSelectedStatus(selectedStatus);

        switch (selectedStatus) {
            case (selectorStatus.Man):
                _setSelectedGender(Gender.Male);
                _removeChildGenderSelector();
                if (_edgeYears <= parseInt(this._yearSelector.val()))
                    _setSelectedYear(_defaultAdultYear);
                break;
            case (selectorStatus.Woman):
                _setSelectedGender(Gender.Female);
                _removeChildGenderSelector();
                if (_edgeYears <= parseInt(this._yearSelector.val()))
                    _setSelectedYear(_defaultAdultYear);
                break;
            case (selectorStatus.Boy):
                _removeChildGenderSelector();
                _createChildGenderSelector();
                if (_edgeYears > parseInt(this._yearSelector.val()))
                    _setSelectedYear(_defaultChildYear);
                break;
            case (selectorStatus.Girl):
                _removeChildGenderSelector();
                _createChildGenderSelector();
                if (_edgeYears > parseInt(this._yearSelector.val()))
                    _setSelectedYear(_defaultChildYear);
                break;
        }
        _ajaxGetSymptoms(false);
        _makeDiagnosis();
    }

    function _setSelectedGender(selectedGender) {
        setCookie("selectedGender", selectedGender, 1);
        _selectedGender = selectedGender;
    }

    function _setSelectedYear(selectedYear) {
        setCookie("selectedYear", selectedYear, 1);
        this._yearSelector.val(selectedYear);
        _selectedYear = selectedYear;
    }

    function _markSelectedStatus(selectedStatus) {
        var selectedSmallAvatar = _getSmallAvatarByStatus(selectedStatus);
        selectedSmallAvatar.css("border", "2px solid #" + _statusLinkBorderColor);
    }

    function _clearSelectedStatusMark(selectedStatus) {
        var selectedSmallAvatar = _getSmallAvatarByStatus(selectedStatus);
        selectedSmallAvatar.css("border", "none");
    }

    function _makeDiagnosis() {
        if (mode == "booking")
            return;

        if (isDisclaimerChecked()) {
            var options = new Object();

            options.Symptoms = _symptomList.symptomList("GetSelectedSymptoms");
            options.Gender = _selectedGender;
            options.YearOfBirth = _selectedYear;
            if (mode == "diagnosis")
                $("#" + _diagnosisListId).diagnosis("GetDiagnosis", options);

            if (mode == "specialisations")
                $("#" + _diagnosisListId).specialisations("GetSpecialisations", options);

            _symptomList.symptomList("LoadProposedSymptoms", options);
        }

    }

    var substringMatcher = function (strs) {
        return function findMatches(q, cb) {
            var matches, substrRegex;

            // an array that will be populated with substring matches
            matches = [];

            // regex used to determine if a string contains the substring `q`
            substrRegex = new RegExp(q, 'i');

            // iterate through the pool of strings and for any string that
            // contains the substring `q`, add it to the `matches` array
            $.each(strs, function (i, str) {
                if (substrRegex.test(str.Name)) {
                    // the typeahead jQuery plugin expects suggestions to a
                    // JavaScript object, refer to typeahead docs for more info
                    matches.push({ value: str.Name });
                }
            });

            cb(matches);
        };
    };

    var fillResults = function (symptoms, initTypeAhead) {
        var _symptoms = new Array();
        $.each(symptoms, function () {
            if (this.Name !== "" && this.Name !== " ")
                _symptoms.push(this);
        });

        var options = new Object();
        options.LocationId = location;
        options.SelectorStatus = _selectedSelectorStatus;
        options.Gender = _selectedGender;
        options.YearOfBirth = _selectedYear;
        options.ValidSymptoms = _symptoms;

        _symptomList.symptomList("SetValidSymptoms", options);

        if (initTypeAhead)
            _initTypeAhead();
        else {
            $("#prefetch .typeahead").typeahead("destroy");
            _initTypeAhead();
        }

    };

    function _initTypeAhead() {
        $('#prefetch .typeahead').typeahead({
            hint: true,
            highlight: true,
            minLength: 2
        },
        {
            name: '_symptoms',
            displayKey: 'value',

            source: substringMatcher(_symptomList.symptomList("GetValidSymptoms"))
        }
        ).bind("typeahead:selected", function (obj, datum, name) {
            var result = $.grep(_symptomList.symptomList("GetValidSymptoms"), function (e) { return e.Name == datum.value; });
            var options = new Object();
            options.ID = result[0].ID;
            options.Name = result[0].Name;
            _symptomList.symptomList("SelectSymptom", options);
        });
    }


    function _setResourcesCallback(resources) {

        if (resources.length > 0) {
            var skinText = resources[0].Key;//("btnContactForm");
        }
    }

    function _setSpecificResourcesCallback(resources) {

        if (resources.length > 0) {

            $.each(resources, function () {
                resObj[this.Key] = this.Value;

            });
            SetTranslationResources();
            _setUpSelector();
            $("#selectSymptomsTitle").text(selectSymptomsText);
            $("#selectedSymptomsTitle").text(selectedSymptomsText);
            $("#possibleDiseasesTitle").text(possibleDiseasesText);
        }
    }

    function SetTranslationResources() {

        if (resObj != null) {
            disclaimerText = resObj.litTermsOfUsePolicyPrivacy;
            litTermsOfUse = resObj.litTermsOfUse;
            litPrivacyPolicy = resObj.litPrivacyPolicy;
            disclaimerNotAcceptedText = resObj.litDisclaimerNotChecked;
            noSelectedSymptomsText = resObj["litAddAdditionalComplaints"];
            diagnosisMessage = resObj["litEmergencyInfo"];
            noDiagnosisMessage = resObj["litEmptyDiagnosisDataTemplate"];
            proposedSymptomsText = resObj["litSuggestedSymptoms"];
            symptomListMessage = resObj["litCarouselItem4"];
            skinText = resObj["genAvatarText"];
            bornOnText = resObj.litYears;
            typeYourSymptomsText = resObj.litSearchSymptoms;
            selectSymptomsText = resObj.genSelectSymptoms;
            selectedSymptomsText = resObj.genSelectedSymptoms;
            possibleDiseasesText = resObj.genPossibleDiseases;

            makeDiagnosisText = resObj.btnGenerateDiagnose;
            litProfName = resObj.txtProfessionalName;
            litShortDescription = resObj.genShortDescription;
            litDescription = resObj.genDescription;
            litOccurrence = resObj.genOccurrence;
            litSymptom = resObj.genSymptom;
            litFollowgen = resObj.genFollow1;
            litTreatment = resObj.genTreatment;
            litPossibleSymptoms = resObj.litPossibleSymptoms;
        }
    }

    //////////////////end private functions//////////////////////////////////////////

})(jQuery);

/////////////Symptom selector plugin end//////////////////////////////////
//////////////////////////////////////////////////////////////////////////

/////////////Symptom list plugin start/////////////////////////
//////////////////////////////////////////////////////////////////////
(function ($) {

    var _plugin;
    var _symptomList;
    var _locationName;
    var _selectorStatus;
    var _locations = new Object();
    var _validSymptoms = new Array();

    var _selectedList;
    var _selectedListId = "selectedSymptomList";
    var _diagnosisListId = "diagnosisList";
    var _proposedList;
    var _proposedListHeader;
    var _symptomListMessage;
    var _loader;
    var _header;
    var _emptySelectedSymptomMessage;
    var _redFlagMessage;

    var _avatarOptions;

    var methods = {

        init: function (options) {
            return this.each(function () {
                _plugin = $(this);
                _initSymptomList();
                _avatarOptions = options;

                if (redirectUrl === "") {
                    if (mode == "diagnosis")
                        $("#" + _diagnosisListId).diagnosis();

                    if (mode == "specialisations")
                        $("#" + _diagnosisListId).specialisations();

                    var symptoms = _getSelectedSymptoms();
                    if (symptoms.length !== 0) {
                        _showTerms();
                        _makeDiagnosis();
                    }
                }
            });
        },
        LoadBodyLocations: function (options) {
            _ajaxLoadBodyLocations(options.LocationId);
        },
        LoadBodySublocations: function (options) {
            _avatarOptions = options;
            _loadBodySublocation(options.LocationId, options.SelectorStatus);
            _header.text(_locations[options.LocationId]);
        },
        GetSelectedSymptoms: function (options) {
            return _getSelectedSymptoms();
        },
        SelectSymptom: function (options) {
            _selectSymptom(options);
        },
        SetValidSymptoms: function (options) {
            _validSymptoms = options.ValidSymptoms;
            _avatarOptions.SelectorStatus = options.SelectorStatus;
            _avatarOptions.Gender = options.Gender;
            _avatarOptions.YearOfBirth = options.YearOfBirth;

            var synonyms = new Array();
            $.each(_validSymptoms, function () {
                if (this.Synonyms != null && typeof (this.Synonyms) !== "undefined" && this.Synonyms.length > 0) {
                    var currentId = this.ID;
                    var name = this.Name;
                    var hasRedFlag = this.HasRedFlag;
                    $.each(this.Synonyms, function () {
                        var syn = new Object();
                        syn.ID = currentId;
                        syn.Name = this + "(" + name + ")";
                        syn.HasRedFlag = hasRedFlag;
                        syn.IsSynonym = true;
                        syn.HealthSymptomLocationIDs = new Array();
                        synonyms.push(syn);
                    });
                }
            });

            $.each(synonyms, function () {
                _validSymptoms.push(this);
            });
            var symptoms = _getSelectedSymptoms();
            if (symptoms.length !== 0) {
                _addSelectedSymptoms(symptoms);
            }
        },
        GetValidSymptoms: function (options) {
            return _validSymptoms;
        },
        LoadProposedSymptoms: function (options) {
            _clearProposedSymptom();
            _ajaxLoadProposedSymptoms(options.Symptoms, options.Gender, options.YearOfBirth);
        },
        Unbind: function (options) {
            _selectedList.unbind('click');
            _selectedList.empty();
            _plugin.unbind('click');
            _plugin.empty();
        }
    };

    $.fn.symptomList = function (method) {

        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        } else {
            $.error('Method ' + method + ' does not exist on jQuery.symptomList');
        }

    };

    //////////////////ajax calls/////////////////////////////////////////////////////
    function _ajaxLoadBodyLocations(selectedLocationId) {
        $.ajax({
            url: pathToWebservice + "/body/locations",
            type: "GET",
            data:
                {
                    token: token,
                    format: "json",
                    language: language
                },
            contentType: "application/json; charset=utf-8",
            cache: false,
            dataType: "jsonp",
            jsonpCallback: "_addLocationsCallback",
            success: function (responseData) { _addLocationsCallback(responseData, selectedLocationId); },
            beforeSend: function (jqXHR, settings) {
            },
            error: function (xhr, ajaxOptions, thrownError) {
                if (window.console)
                    console.log(xhr.responseText);
            },
            complete: function () {
            }
        });
    }

    function _ajaxLoadBodySublocations(locationId) {
        $.ajax({
            url: pathToWebservice + "/body/locations/" + locationId,
            type: "GET",
            data:
                {
                    token: token,
                    format: "json",
                    language: language
                },
            contentType: "application/json; charset=utf-8",
            cache: false,
            dataType: "jsonp",
            jsonpCallback: "_addSublocationsCallback",
            success: function (responseData) { _addSublocationsCallback(responseData, locationId); },
            beforeSend: function (jqXHR, settings) {
                _loader.show();
            },
            error: function (xhr, ajaxOptions, thrownError) {
                if (window.console)
                    console.log(xhr.responseText);
            },
            complete: function () {
                _loader.hide();
            }
        });
    }

    function _ajaxLoadProposedSymptoms(symptoms, gender, year_of_birth) {
        $.ajax({
            url: pathToWebservice + "/symptoms/proposed",
            type: "GET",
            async: true,
            data:
                {
                    token: token,
                    format: "json",
                    language: language,
                    symptoms: JSON.stringify(symptoms),
                    gender: gender,
                    year_of_birth: year_of_birth,
                    platform: currentPlatform
                },
            contentType: "application/json; charset=utf-8",
            cache: false,
            dataType: "jsonp",
            jsonpCallback: "_addProposedSymptomsCallback",
            success: function (responseData) { _addProposedSymptomsCallback(responseData); },
            beforeSend: function (jqXHR, settings) {
                $('#loader').show();
            },
            error: function (xhr, ajaxOptions, thrownError) {
                if (window.console)
                    console.log(xhr.responseText);
            },
            complete: function () {
                $('#loader').hide();
            }
        });
    }

    function _ajaxGetRedFlagText(symptomId) {
        $.ajax({
            url: pathToWebservice + "/redflag",
            type: "GET",
            async: true,
            data:
                {
                    token: token,
                    format: "json",
                    language: language,
                    symptomId: symptomId
                },
            contentType: "application/json; charset=utf-8",
            cache: false,
            dataType: "jsonp",
            jsonpCallback: "_getRedFlagCallback",
            success: function (responseData) { _getRedFlagCallback(responseData); },
            beforeSend: function (jqXHR, settings) {
                $('#loader').show();
            },
            error: function (xhr, ajaxOptions, thrownError) {
                if (window.console)
                    console.log(xhr.responseText);
            },
            complete: function () {
                $('#loader').hide();
            }
        });
    }

    //////////////////end ajax calls/////////////////////////////////////////////////////

    //////////////////private functions//////////////////////////////////////////////

    function _initSymptomList() {
        _symptomList = jQuery("<ul/>", { "class": "location_list" });

        _proposedList = jQuery("<ul/>", { "class": "proposed_list" });
        _proposedListHeader = jQuery("<h4/>", { "text": proposedSymptomsText, "class": "header proposed_list_header" });
        _proposedListHeader.hide();

        _header = jQuery("<h4/>", { "class": "header symptom_list_header" });
        _header.hide();

        _symptomListMessage = jQuery("<span/>", { "class": "message info", "text": symptomListMessage });

        _loader = jQuery("<div/>", { "class": "loader" });
        _loader.hide();

        _plugin.append(_header);
        _plugin.append(_symptomListMessage);
        _plugin.append(_loader);

        _selectedList = $("#" + _selectedListId);
        _selectedList.parent().addClass("box-inactive");

        _selectedList.append(jQuery("<ul/>", { "class": "selected_list" }));
        _selectedList.append(_createNoSymptomsSelectedMessage());
        _selectedList.append(_createTermsElement());
        _selectedList.append(_createTermsNotAcceptedMessage());
        _selectedList.append(_proposedListHeader);
        _selectedList.append(_proposedList);

        _plugin.append(_symptomList);

        _createRedFlagMessage();
    }

    function _createRedFlagMessage() {
        _redFlagMessage = jQuery("<div/>", { "id": "redFlagMessage", "class": "info_page" });
        var redFlagMessageContainer = jQuery("<div/>", { "class": "container" });
        var message = jQuery("<span/>");
        _redFlagMessage.append(redFlagMessageContainer);

        _redFlagMessage.hide();


        $("body").append(_redFlagMessage);

        var content = jQuery("<div/>", { "id": "redFlagContent", "class": "warning" });
        content.append(message);
        redFlagMessageContainer.append(content);

        var btnClose = jQuery("<i/>", { "id": "btnCloseRedFlag", "class": "fa fa-times" });
        btnClose.bind('click', function () {
            _redFlagMessage.find("#redFlagContent span").empty();
            _redFlagMessage.hide();
        });

        content.append(btnClose);
    }

    //load body sublocations
    function _loadBodySublocation(locationId, selectorStatus) {
        _header.show();

        if (_selectorStatus != "" && _selectorStatus != selectorStatus)
            _hideSymptoms(_selectorStatus);

        _selectorStatus = selectorStatus;

        _symptomList.find(".sublocation").hide();

        if (!_isLoadedSublocations(locationId)) {
            _symptomListMessage.hide();
            _ajaxLoadBodySublocations(locationId);
        }
        else
            _symptomList.find(".location_" + locationId).show();
    }

    //create body sublocations list elements
    function _addBodySublocation(sublocation, locationId) {
        if (_isValidSublocation(sublocation.ID) == false)
            return;

        var sublocationListElement = jQuery("<li/>", {
            "id": "sublocation_" + sublocation.ID,
            "class": "sublocation location_" + locationId,
            "text": sublocation.Name
        });

        //var sublocationListElementText = jQuery("<p/>", {
        //    "text": sublocation.Name
        //});

        sublocationListElement.bind('click', function () {
            if (_isLoadedSymptoms(sublocation.ID))
                _symptomList.find("#symptoms_" + _selectorStatus + "_" + sublocation.ID).toggle();
            else {
                var symptoms = _getSublocationSymptoms(sublocation.ID)
                _fillSublocations(symptoms, sublocation.ID);
            }

            $(this).toggleClass("open");
        });

        //sublocationListElement.append(sublocationListElementText);
        _symptomList.append(sublocationListElement);
    }

    //create body sublocations symptoms list elements
    function _addBodySublocationSymptoms(symptom, sublocation, selectedSymptoms) {

        var sublocationSymptomListElement = jQuery("<li/>", {
            "class": "symptom-item symptom_" + symptom.ID,
            "text": symptom.Name,
            "symptom_id": symptom.ID
        });

        var isSelected = $.grep(selectedSymptoms, function (e) { return parseInt(e) == parseInt(symptom.ID); });

        if (isSelected.length != 0)
            sublocationSymptomListElement.hide();

        sublocationSymptomListElement.bind('click', function () {
            _selectSymptom(symptom);
        });

        sublocation.append(sublocationSymptomListElement);
    }

    function _addLocationsCallback(locations, selectedLocationId) {
        $.each(locations, function () {
            _locations[this.ID] = this.Name;
        });

        if (selectedLocationId !== null && selectedLocationId !== "")
            _header.text(_locations[selectedLocationId]);
    }

    function _addSublocationsCallback(sublocations, locationId) {
        $.each(sublocations, function () {
            _addBodySublocation(this, locationId);
        });
    }

    function _fillSublocations(symptoms, sublocationId) {
        var symptomListElement = jQuery("<ul/>", {
            "id": "symptoms_" + _selectorStatus + "_" + sublocationId,
            "class": "symptom_list symptoms_" + _selectorStatus
        });

        _symptomList.find("#sublocation_" + sublocationId).append(symptomListElement);

        var selectedSymptoms = _getSelectedSymptoms();
        $.each(symptoms, function () {
            _addBodySublocationSymptoms(this, symptomListElement, selectedSymptoms);
        });
    }

    function _getSublocationSymptoms(sublocationId) {
        var symptoms = $.grep(_validSymptoms, function (e) {
            var valid = false;
            $.each(e.HealthSymptomLocationIDs, function () {

                if (parseInt(this) == sublocationId)
                    valid = true;
            });
            return valid;
        });

        symptoms.sort(_sortByName);

        return symptoms;
    }

    function _getRedFlagCallback(redFlagText) {
        if (redFlagText !== null && redFlagText !== "") {
            _redFlagMessage.show();
            _redFlagMessage.find("#redFlagContent span").html(redFlagText);
        }
    }

    function _addSelectedSymptoms(symptoms) {
        $.each(symptoms, function () {
            var symptomId = this;

            var symptom = $.grep(_validSymptoms, function (e) { return parseInt(e.ID) == parseInt(symptomId); });
            _createSelectedSymptomElement(symptom[0]);
        });
    }

    function _isLoadedSymptoms(sublocationId) {
        return _symptomList.find("#symptoms_" + _selectorStatus + "_" + sublocationId).length > 0;
    }

    function _isLoadedSublocations(locationId) {
        return _symptomList.find(".location_" + locationId).length > 0;
    }

    function _selectSymptom(symptom) {
        var symptoms = _getSelectedSymptoms();
        if (inArray(symptom.ID, symptoms) >= 0)// already exist
            return;

        var selected = getCookie("selectedSymptoms");

        if (selected != "")
            selected += "," + symptom.ID;
        else
            selected = symptom.ID;

        setCookie("selectedSymptoms", selected, 1);

        if (redirectUrl !== "") {
            setTimeout(function () { window.location = redirectUrl; }, 500);
            return;
        }

        _createSelectedSymptomElement(symptom);
        _symptomList.find(".symptom_" + symptom.ID).hide();

        _showTerms();
        _ajaxGetRedFlagText(symptom.ID);
        _makeDiagnosis();
        _plugin.parent().removeClass("box-inactive");
    }

    function _hideSymptoms(selectorStatus) {
        _symptomList.find(".symptoms_" + _selectorStatus).hide();
        _symptomList.find(".symptoms_" + _selectorStatus).parent().removeClass("open");
    }

    function _isValidSublocation(sublocationId) {
        var valid = false;
        $.each(_validSymptoms, function () {
            $.each(this.HealthSymptomLocationIDs, function () {
                if (parseInt(this) == parseInt(sublocationId))
                    valid = true;
            });
        });

        return valid;
    }

    function _sortByName(a, b) {
        var aName = a.Name.toLowerCase();
        var bName = b.Name.toLowerCase();
        return ((aName < bName) ? -1 : ((aName > bName) ? 1 : 0));
    }

    ////////////////////selected list////////////////////////////////////////////////

    function _createSelectedSymptomElement(symptom) {
        if (_selectedList.find("#selected_" + symptom.ID).length > 0)
            return;

        var symptomElement = jQuery("<li/>", {
            "text": symptom.Name,
            "id": "selected_" + symptom.ID,
            "class": "selected_symptom",
            "symId": symptom.ID
        });

        var btnRemove = jQuery("<i/>", {
            "class": "fa fa-times"
        });

        btnRemove.bind('click', function () {
            _removeSymptom(symptom.ID);
            $(this).parent().remove();
        });

        symptomElement.append(btnRemove);

        _selectedList.find("ul.selected_list").append(symptomElement);
    }

    function _getSelectedSymptoms() {
        var symptoms = new Array();
        var selected = getCookie("selectedSymptoms");
        if (selected !== "")
            symptoms = selected.split(",");

        return symptoms;
    }

    function _addGenerateDiagnosisButton() {
        var btnGenerateDiagnosis = jQuery("<input/>", {
            "value": makeDiagnosisText,
            "id": "btnGenerateDiagnosis",
            "type": "button"
        });

        btnGenerateDiagnosis.bind('click', function () {
            if (!isDisclaimerChecked()) {
                _selectedList.find("#termsNotAcceptedMessage").show();
                return;
            }
            _makeDiagnosis();
        });

        return btnGenerateDiagnosis;
    }

    function _makeDiagnosis() {
        _avatarOptions.Symptoms = _getSelectedSymptoms();

        if (isDisclaimerChecked()) {
            if (mode == "diagnosis")
                $("#" + _diagnosisListId).diagnosis("GetDiagnosis", _avatarOptions);

            if (mode == "specialisations")
                $("#" + _diagnosisListId).specialisations("GetSpecialisations", _avatarOptions);
        }

        if (_avatarOptions.Symptoms.length > 0) {
            _clearProposedSymptom();
            _ajaxLoadProposedSymptoms(_avatarOptions.Symptoms, _avatarOptions.Gender, _avatarOptions.YearOfBirth);
        }
    }

    function _removeSymptom(symptomId) {
        var selected = _getSelectedSymptoms();

        selected = jQuery.grep(selected, function (el) {
            return (parseInt(el) !== symptomId);
        });
        setCookie("selectedSymptoms", selected, 1);

        if (selected.length == 0)
            _hideTerms();

        _symptomList.find(".symptom_" + symptomId).show();

        _makeDiagnosis();
    }

    function _createNoSymptomsSelectedMessage() {
        var p = jQuery("<span/>", {
            "id": "noSymptomsSelectedMessage",
            "class": "message info",
            "text": noSelectedSymptomsText
        });

        return p;
    }

    function _createTermsElement() {
        if (mode == "booking") {
            var p = jQuery("<p/>");
            return p;
        }

        var p = jQuery("<span/>", {
            id: "terms",
            "class": "message info"
        });
        var checked = isDisclaimerChecked();
        var chkBoxTerms = jQuery("<input/>", {
            "type": "checkbox",
            "checked": checked,
            "class": "terms-checkbox"
        });

        chkBoxTerms.bind('click', function () {
            if (this.checked) {
                setCookie("diagnosisDisclaimer", "true", 0.1);
                _selectedList.find("#termsNotAcceptedMessage").hide();
            }
            else {
                setCookie("diagnosisDisclaimer", "false", -1);
            }
            isDisclaimerChecked();
        });

        // set privacy and terms links
        //disclaimerText = disclaimerText.replace(litTermsOfUse, "<a href='" + termsUrl + "' download='" + termsUrl + "' class='terms' target='_blank'>" + litTermsOfUse + "</a>").replace(litPrivacyPolicy, "<a href='" + privacyUrl + "' download='" + privacyUrl + "' class='terms' target='_blank'>" + litPrivacyPolicy + "</a>");
        var litTermsOfUseInText = '#' + litTermsOfUse.replace(/ /g, '').toLowerCase() + '#';
        var litPrivacyPolicyInText = '#' + litPrivacyPolicy.replace(/ /g, '').toLowerCase() + '#';
        disclaimerText = disclaimerText.replace(litTermsOfUseInText, "<a href='" + termsUrl + "' class='terms' target='_blank' >" + litTermsOfUse + "</a>").replace(litPrivacyPolicyInText, "<a href='" + privacyUrl + "' class='terms' target='_blank' >" + litPrivacyPolicy + "</a>");

        var termsText = jQuery("<label/>", {
        });

        termsText.html(disclaimerText);

        var diagnosisButton = _addGenerateDiagnosisButton();

        p.append(chkBoxTerms);
        p.append(termsText);
        p.append("<br/>");
        p.append(diagnosisButton);
        p.hide();

        return p;
    }

    function _createTermsNotAcceptedMessage() {
        var p = jQuery("<span/>", {
            "id": "termsNotAcceptedMessage",
            "class": "message warning",
            "text": disclaimerNotAcceptedText
        });

        p.hide();
        return p;
    }

    function _showTerms() {
        _selectedList.find("#noSymptomsSelectedMessage").hide();
        _selectedList.find("#terms").show();
        _selectedList.parent().removeClass("box-inactive");
    }

    function _hideTerms() {
        _selectedList.find("#terms").hide();
        _selectedList.find("#noSymptomsSelectedMessage").show();
        _selectedList.parent().addClass("box-inactive");
    }

    //////////////////proposed symptoms list/////////////////////////////////////////

    function _addProposedSymptomsCallback(symptoms) {
        if (symptoms.length > 0)
            _proposedListHeader.show();
        else
            _proposedListHeader.hide();

        $.each(symptoms, function () {
            _addProposedSymptom(this);
        });
    }

    function _addProposedSymptom(symptom) {
        var proposedSymptomListElement = jQuery("<li/>", {
            "text": symptom.Name,
            "symptom_id": symptom.ID
        });

        proposedSymptomListElement.bind('click', function () {
            _selectSymptom(symptom);
        });

        _proposedList.append(proposedSymptomListElement);
    }

    function _clearProposedSymptom() {
        _proposedList.find("li").remove();
    }

    //////////////////end private functions//////////////////////////////////////////

})(jQuery);

/////////////symptom list plugin end/////////////////////////
//////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////
/////////////diagosis result plugin start///////////////////////

(function ($) {

    var _plugin;
    var _diagnosisList;
    var _diagnosisMessage;
    var _loader;
    var _infoPage;

    var methods = {

        init: function (options) {

            return this.each(function () {
                _plugin = $(this);
                _plugin.parent().addClass("box-inactive");
                _initDiagnosisList();
            });
        },
        GetDiagnosis: function (options) {
            _clearDiagnosis();
            _ajaxGetDiagnosis(options.Symptoms, options.Gender, options.YearOfBirth);
        },
        Unbind: function (options) {
            _plugin.unbind('click');
            _plugin.empty();
        }
    };

    $.fn.diagnosis = function (method) {

        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        } else {
            $.error('Method ' + method + ' does not exist on jQuery.diagnosis');
        }

    };

    //////////////////private functions//////////////////////////////////////////
    function _initDiagnosisList() {
        _diagnosisList = jQuery("<ul/>", { "class": "diagnosis_list" });

        _diagnosisMessage = jQuery("<span/>", { "class": "message info", "text": diagnosisMessage });
        _diagnosisMessage.hide();
        _loader = jQuery("<div/>", { "id": "diagnosisLoader", "class": "loader" });
        _loader.hide();
        _plugin.append(_loader);
        _plugin.append(_diagnosisList);
        _plugin.append(_diagnosisMessage);

        _createIssueInfoPage();
    }

    function _createIssueInfoPage() {
        _infoPage = jQuery("<div/>", { "class": "info_page" });
        $("body").append(_infoPage);

        var content = jQuery("<div/>", { "class": "info_page_content" });
        _infoPage.append(content);

        infoPageLoader = jQuery("<div/>", { "id": "infoPageLoader", "class": "loader" });
        _infoPage.append(infoPageLoader);

        var btnClose = jQuery("<i/>", { "id": "btnCloseInfo", "class": "fa fa-times btn_info" });
        btnClose.bind('click', function () {
            _infoPage.find(".info_page_content").empty();
            _infoPage.hide();
        });
        var btnPrint = jQuery("<i/>", { "id": "btnPrintInfo", "class": "fa fa-print btn_info" });
        btnPrint.bind('click', function () {
            _print(content);
        });

        _infoPage.append(btnClose);
        _infoPage.append(btnPrint);
    }

    function _createDiagnosisElement(diagnosis) {
        _diagnosisList.append(_createDiagnosisNameElement(diagnosis.Issue.ID, diagnosis.Issue.Name));
        _diagnosisList.append(_createProbabilityElement(diagnosis.Issue.Accuracy));
        _diagnosisList.append(_createSpecialisationElement(diagnosis.Specialisation));
    }

    function _addDiagnosisCallback(diagnosis) {
        _diagnosisMessage.hide();
        $.each(diagnosis, function () {
            _createDiagnosisElement(this);
        });
        if (diagnosis.length > 0) {
            _plugin.parent().removeClass("box-inactive");
            _setDiagnosisMessage(diagnosisMessage);
        }
        else {
            _plugin.parent().addClass("box-inactive");
            _setDiagnosisMessage(noDiagnosisMessage);
        }
    }

    function _addIssueInfoCallback(issueInfo) {
        var htmlContent = "<div>";
        htmlContent += "<h1 class='margin-none' itemprop=\"name\">" + issueInfo.Name + "</h1>";

        var countSynonyms = 0;
        if (issueInfo.Synonyms != null && issueInfo.Synonyms !== "") {
            htmlContent += "<h4>(" + issueInfo.Synonyms + ")</h4>";
        }

        if (issueInfo.ProfName != null && issueInfo.ProfName !== "") {
            htmlContent += "<h3 class='border-bottom'><small>" + litProfName + "  (<b itemprop=\"alternateName\">" + issueInfo.ProfName + "</b>)</small></h3>";
        }

        if (issueInfo.DescriptionShort != null && issueInfo.DescriptionShort != "") {
            htmlContent += "<h3>" + litShortDescription + "</h3><p class='healthIssueInfo'>" + issueInfo.DescriptionShort + "</p>";
        }

        //if (issueInfo.Description != null && issueInfo.Description != "") {
        //    htmlContent += "<h3>" + litDescription + "</h3><p class='healthIssueInfo'>" + issueInfo.Description + "</p>";
        //}

        //if (issueInfo.MedicalCondition != null && issueInfo.MedicalCondition != "" && typeof (issueInfo.MedicalCondition) != 'undefined' && issueInfo.MedicalCondition != null) {
        //    htmlContent += "<h3>" + litOccurrence + " + " + litSymptom + "</h3><p class='healthIssueInfo'>" + issueInfo.MedicalCondition + "</p>";
        //}

        //if (issueInfo.TreatmentDescription != null && issueInfo.TreatmentDescription != "") {
        //    htmlContent += "<h3>" + litFollow + " + " + litTreatment + "</h3><p class='healthIssueInfo'>" + issueInfo.TreatmentDescription + "</p>";
        //}

        if (issueInfo.PossibleSymptoms != "" && issueInfo.PossibleSymptoms != null) {
            htmlContent += "<h3>" + litPossibleSymptoms + "</h3><p class='healthIssueInfo'>" + issueInfo.PossibleSymptoms + "</p>";
        }

        //TODO: references should be shown properly - this string is comming from Wikipedia !!!! string ret = client.DownloadString(url);
        htmlContent = htmlContent.replace("Cite error: There are <ref> tags on this page, but the references will not show without a {{reflist}} template (see the help page).", "");

        var windowHeight = $(".container-table").height();
        _infoPage.css('min-height', windowHeight + 'px');

        _infoPage.find(".info_page_content").append(htmlContent);
        $("html, body").animate({ scrollTop: 0 }, "fast");
        $('html, body', window.parent.document).animate({ scrollTop: 100 }, 'fast');
    }

    function _createDiagnosisNameElement(issueId, diagnosisName) {
        var diagnosisListElement = jQuery("<li/>", {
        });

        var diagnosisNameElement = jQuery("<h4/>", {
            "text": diagnosisName,
            "class": "header diagnosis_name_header"
        });

        var issueInfo = jQuery("<i/>", {
            "class": "fa fa-info-circle ic-issue-info"
        });

        issueInfo.bind('click', function () {
            _ajaxGetIssueInfo(issueId);
        });

        diagnosisNameElement.append(issueInfo);

        diagnosisListElement.append(diagnosisNameElement);

        return diagnosisListElement;
    }

    function _createProbabilityElement(accuracy) {
        diagnosisListElement = jQuery("<li/>", {
        });

        var progress = jQuery("<div/>", {
            "class": "progress"
        });

        var bar = jQuery("<div/>", {
            "class": "progress-bar progress-bar-primary animate"
        });
        console.log(accuracy);
        var currentProgress = 0;
        bar.width(currentProgress + '%');
        var interval = setInterval(function () {
            if (currentProgress >= accuracy) {
                clearInterval(interval);
            } else {
                currentProgress++;
                bar.width(currentProgress + '%');
            }
        }, 20);
        progress.append(bar);
        diagnosisListElement.append(progress);
        return diagnosisListElement;
    }

    function _createSpecialisationElement(specialisation) {
        var specList = jQuery("<ul/>", { "class": "spec_list" });

        if (!includeAllSpec) {
            $.each(specialisation, function () {
                specListElement = jQuery("<li/>", {
                });
                var spec = jQuery("<a/>", {
                    "text": this.Name,
                    //TODO
                    //"href": specUrl + "/" + this.Name + "/" + this.ID
                    "href": specUrl + "?specId=" + this.SpecialistID
                });

                specListElement.append(spec);
                specList.append(specListElement);
            });
        }
        else {
            var specNames = new Array();
            $.each(specialisation, function () {
                specNames.push(this.Name);
            });
            $.each(specialisation, function () {
                specListElement = jQuery("<li/>", {
                });
                var spec = jQuery("<a/>", {
                    "text": this.Name,
                    "href": specUrl + "?specs=" + JSON.stringify(specNames)
                });

                specListElement.append(spec);
                specList.append(specListElement);
            });
        }


        var element = jQuery("<li/>", {
        });

        element.append(specList);
        return element;
    }

    function _clearDiagnosis() {
        _plugin.find("ul").empty();
    }

    function _setDiagnosisMessage(message) {
        _diagnosisMessage.text(message);
        _diagnosisMessage.show();
    }

    function _print(printSource) {
        var name = printSource.find("h1").text();
        var printFooter = "<div style=\"float:right;\"><img src=\"symptom_selector/images/logo.jpg\" alt=\"priaid\" class=\"logo\"><span><a href=\"http://www.priaid.com\" target=\"_blank\" class=\"priaid-powered\"> powered by  </a> </span></div>"
        printFooter += "<div style=\"float:right;padding-right:16px;clear:both;\"><span><a href=\"http://www.priaid.com\" target=\"_blank\"  class=\"priaid-powered padding0\">(www.priaid.com)</a> </span> </div></div>"
        var printContent = printSource.clone();

        printContent = printContent.html();

        var popupWin = window.open('', '_blank', 'width=800,height=600');
        popupWin.document.open();
        popupWin.document.write("<html><head><link rel=\"stylesheet\" type=\"text/css\" href=\"symptom_selector/print.css\"><title=\"priaid -" + name + "></title></head><body onload=\"window.print()\"><div id=\"#container\">" + printContent + printFooter + "</div></html>");
        //popupWin.document.write(html.join(""));
        popupWin.document.title = "priaid - " + name;
        popupWin.document.close();
    }

    //////////////////ajax calls//////////////////////////////////////////



    function _ajaxGetIssueInfo(issueId) {
        $.ajax({
            url: pathToWebservice + "/issues/" + issueId + "/info",
            type: "GET",
            data:
                {
                    token: token,
                    format: "json",
                    language: language,
                    platform: currentPlatform
                },
            contentType: "application/json; charset=utf-8",
            cache: false,
            dataType: "jsonp",
            jsonpCallback: "_addIssueInfoCallback",
            success: function (responseData) { _addIssueInfoCallback(responseData); },
            beforeSend: function (jqXHR, settings) {
                _infoPage.find("#infoPageLoader").show();
                _infoPage.show();
            },
            error: function (xhr, ajaxOptions, thrownError) {
                if (window.console)
                    console.log(xhr.responseText);
            },
            complete: function () {
                _infoPage.find("#infoPageLoader").hide();
            }
        });


    }

    //////////////////end ajax calls//////////////////////////////////////////

    //////////////////end private functions//////////////////////////////////////////

})(jQuery);

/////////////diagosis result plugin end/////////////////////////
//////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////
/////////////specialisation result plugin start///////////////////////

(function ($) {

    var _plugin;
    var _specialisationsList;
    var _diagnosisMessage;
    var _loader;

    var methods = {

        init: function (options) {

            return this.each(function () {
                _plugin = $(this);
                _plugin.parent().addClass("box-inactive");
                _initSpecialisationList();
            });
        },
        GetSpecialisations: function (options) {
            _clearSpecialisations();
            _ajaxGetSpecialisations(options.Symptoms, options.Gender, options.YearOfBirth);
        },
        Unbind: function (options) {
            _plugin.unbind('click');
            _plugin.empty();
        }
    };

    $.fn.specialisations = function (method) {

        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        } else {
            $.error('Method ' + method + ' does not exist on jQuery.diagnosis');
        }

    };

    //////////////////private functions//////////////////////////////////////////
    function _initSpecialisationList() {
        _specialisationsList = jQuery("<ul/>", { "class": "diagnosis_list" });

        _diagnosisMessage = jQuery("<span/>", { "class": "message info", "text": diagnosisMessage });
        _diagnosisMessage.hide();
        _loader = jQuery("<div/>", { "id": "diagnosisLoader", "class": "loader" });
        _loader.hide();
        _plugin.append(_loader);
        _plugin.append(_specialisationsList);
        _plugin.append(_diagnosisMessage);
    }

    function _createSpecialisationElement(spec, allSuggestedSpec) {
        _specialisationsList.append(_createSpecialisationNameElement(allSuggestedSpec, spec.Name));
        _specialisationsList.append(_createProbabilityElement(spec.Accuracy));
    }

    function _addSpecialisationsCallback(specialisations) {
        _diagnosisMessage.hide();
        var allSuggestedSpec = new Array();
        $.each(specialisations, function () {
            allSuggestedSpec.push(this.Name);
        });
        var specnames = JSON.stringify(allSuggestedSpec);

        $.each(specialisations, function () {
            _createSpecialisationElement(this, specnames);
        });
        if (specialisations.length > 0) {
            _plugin.parent().removeClass("box-inactive");
            _setDiagnosisMessage(diagnosisMessage);
        }
        else {
            _plugin.parent().addClass("box-inactive");
            _setDiagnosisMessage(noDiagnosisMessage);
        }
    }

    function _createSpecialisationNameElement(allSuggestedSpec, specName) {
        var specListElement = jQuery("<li/>", {
        });

        var spec = jQuery("<a/>", {
            "class": "suggested_spec",
            "text": specName,
            "href": specUrl + "?specs=" + allSuggestedSpec
        });

        var specNameElement = jQuery("<h4/>", {
            "class": "header diagnosis_name_header"
        });

        specNameElement.append(spec);

        specListElement.append(specNameElement);

        return specListElement;
    }

    function _createProbabilityElement(accuracy) {
        specListElement = jQuery("<li/>", {
        });

        var progress = jQuery("<div/>", {
            "class": "progress"
        });

        var bar = jQuery("<div/>", {
            "class": "progress-bar progress-bar-primary animate"
        });
        var currentProgress = 0;
        bar.width(currentProgress + '%');
        var interval = setInterval(function () {
            if (currentProgress >= accuracy) {
                clearInterval(interval);
            } else {
                currentProgress++;
                bar.width(currentProgress + '%');
            }
        }, 20);
        progress.append(bar);
        specListElement.append(progress);
        return specListElement;
    }

    function _clearSpecialisations() {
        _plugin.find("ul").empty();
    }

    function _setDiagnosisMessage(message) {
        _diagnosisMessage.text(message);
        _diagnosisMessage.show();
    }
    //////////////////ajax calls//////////////////////////////////////////

    function _ajaxGetSpecialisations(symptoms, gender, year_of_birth) {
        $.ajax({
            url: pathToWebservice + "/diagnosis/specialisations",
            type: "GET",
            data:
                {
                    token: token,
                    format: "json",
                    language: language,
                    symptoms: JSON.stringify(symptoms),
                    gender: gender,
                    year_of_birth: year_of_birth,
                    platform: currentPlatform
                },
            contentType: "application/json; charset=utf-8",
            cache: false,
            dataType: "jsonp",
            jsonpCallback: "_addSpecialisationsCallback",
            success: function (responseData) { _addSpecialisationsCallback(responseData); },
            beforeSend: function (jqXHR, settings) {
                _loader.show();
            },
            error: function (xhr, ajaxOptions, thrownError) {
                if (window.console)
                    console.log(xhr.responseText);
            },
            complete: function () {
                _loader.hide();
            }
        });
    }
    //////////////////end ajax calls//////////////////////////////////////////

    //////////////////end private functions//////////////////////////////////////////

})(jQuery);

/////////////specialisation result plugin end/////////////////////////
//////////////////////////////////////////////////////////////////////


//////////////global cookies functions ///////////////////

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toGMTString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = $.trim(ca[i]);
        if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
    }
    return "";
}

function isDisclaimerChecked() {
    var isChecked = getCookie("diagnosisDisclaimer");
    return isChecked !== "" ? isChecked : false;
}


//////////////end cookies functions //////////////////////////////////

function inArray(val, arr) {
    cnt = 0;
    index = -1;
    $(arr).each(function () {
        if (parseInt(this) == parseInt(val)) { index = cnt; }
        cnt++;
    });
    return index;
}