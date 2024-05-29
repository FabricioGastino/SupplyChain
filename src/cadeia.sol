// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SupplyChain {
    struct Product {
        string id;
        string details;
        address currentOwner;
        string[] history;
    }

    mapping(string => Product) public products;

    function registerProduct(string memory id, string memory details) public {
        require(bytes(products[id].id).length == 0, "Product already exists");

        products[id].id = id;
        products[id].details = details;
        products[id].currentOwner = msg.sender;
        products[id].history.push(concat("Registered by ", toAsciiString(msg.sender)));
    }

    function transferProduct(string memory id, address newOwner) public {
        require(products[id].currentOwner == msg.sender, "Only current owner can transfer the product");

        products[id].currentOwner = newOwner;
        products[id].history.push(concat("Transferred to ", toAsciiString(newOwner)));
    }

    function getProductHistory(string memory id) public view returns (string[] memory) {
        return products[id].history;
    }

    function concat(string memory a, string memory b) internal pure returns (string memory) {
        return string(abi.encodePacked(a, b));
    }

    function toAsciiString(address x) internal pure returns (string memory) {
        bytes memory s = new bytes(40);
        for (uint i = 0; i < 20; i++) {
            bytes1 b = bytes1(uint8(uint(uint160(x)) / (2**(8*(19 - i)))));
            bytes1 hi = bytes1(uint8(b) / 16);
            bytes1 lo = bytes1(uint8(b) - 16 * uint8(hi));
            s[2*i] = char(hi);
            s[2*i+1] = char(lo);            
        }
        return string(s);
    }

    function char(bytes1 b) internal pure returns (bytes1 c) {
        if (uint8(b) < 10) return bytes1(uint8(b) + 0x30);
        else return bytes1(uint8(b) + 0x57);
    }
}