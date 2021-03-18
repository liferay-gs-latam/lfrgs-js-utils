import { normalizeSearchString } from 'lfrgs-js-utils';

/**
 *  Node Content Matcher
 *  @Description
 *      
 *      
 */

class NodeContentMatcher {

    constructor(instanceIdentifier, options={}) {

        this.instanceIdentifier = instanceIdentifier;
        this.options = options;

        this.init()

    }

    init() {
        return {
            match: this.match
        }
    }

    test(string, target) {

        if(targetString.indexOf(normalizeSearchString(query)) != -1) {
            contentNode.setAttribute('data-ncm-found', 'true');
            matchingContentNodes.push(contentNode);
            hasMatches = true;
        }

    }
    
    match(query, callback) {

        let itemsNodeList = document.querySelectorAll('*[data-ncm='+this.instanceIdentifier+']');
        let items = Array.prototype.slice.call(itemsNodeList);
        let matches = [];
        let i = -1;
        if(query.length > 0) {

            // Get matching nodes
            items.forEach(item => {
                
                item.removeAttribute('data-ncm-found');
                item.removeAttribute('data-ncm-found-item');

                let itemIndex = item.attributes['data-ncm-index'].value;

                let contentNodes = document.querySelectorAll('*[data-ncm-content="'+this.instanceIdentifier+'"][data-ncm-content-of-index="'+itemIndex+'"]');
                let hasMatches = false;
                let hasItemMatches = false;
                let matchingContentNodes = [];

                // Match on item attr (node-content-match)
                if(item.attributes['data-ncm-string'] && item.attributes['data-ncm-string'].value != '') {
                    if(normalizeSearchString(item.attributes['data-ncm-string'].value).indexOf(normalizeSearchString(query)) != -1) {
                        hasMatches = true;
                        hasItemMatches = true;
                    }
                }

                // Content nodes match
                contentNodes.forEach(contentNode => {
                    
                    contentNode.removeAttribute('data-ncm-found');

                    let targetString = "";
                    if(contentNode.attributes['data-ncm-string'] && contentNode.attributes['data-ncm-string'].value.length > 0) {
                        targetString += contentNode.attributes['data-ncm-string'].value;
                    } else {
                        targetString += contentNode.textContent;
                    }
                    
                    targetString = normalizeSearchString(targetString.trim());
                    
                    if(targetString.indexOf(normalizeSearchString(query)) != -1) {
                        contentNode.setAttribute('data-ncm-found', 'true');
                        matchingContentNodes.push(contentNode);
                        hasMatches = true;
                    }

                });

                if(hasMatches) {
                    item.setAttribute('data-ncm-found', 'true');

                    if(hasItemMatches) {
                        item.setAttribute('data-ncm-found-item', 'true');
                    }

                    matches.push({
                        item: item,
                        nodes: matchingContentNodes
                    })
                }

            });

        } else {
            items.forEach(item => {
                
                item.removeAttribute('data-ncm-found');

            })
        }

        let response = {query: query, matches: matches, items: items};
        if(callback && typeof callback === "function") {
            callback(response);
        } else {
            return response;
        }

    }


}


export default NodeContentMatcher;