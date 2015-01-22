#! /usr/bin/python
"""Modifies nginx configuration file on AWS Elastic Beanstalk to support
WebSocket connections."""

__author__ = "HoangPH <phamhuuhoang@gmail.com>"
__version__ = "0.0.2"

import os

def remove_duplicate_config():
    os.system("rm -rf /etc/nginx/conf.d/00_elastic_beanstalk_proxy.conf")

def restart_nginx():
    os.system("service nginx restart")

def main():
    print '--- Remove old nginx config ---'
    remove_duplicate_config()

    print '--- Restart NginX ---'
    restart_nginx()

if __name__ == "__main__":
    main()