<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">
<xsl:template match="/">
<h1>Die EDV Schule Katigorien</h1>
<table border="1">
	<tr bgcolor="#9acd32">
	<th style="text-align:left">ID</th>
	<th style="text-align:left">KatigorieName</th>
	</tr>
	<xsl:for-each select="kategorien/kategori">
	 <xsl:sort select="id" order="ascending"/>
		<tr>
			<td>
			<xsl:value-of select="id"/>
			</td>
			<td>
			<xsl:value-of select="kategori_name"/>
			</td>
		</tr>
	</xsl:for-each>
</table>
</xsl:template>
</xsl:stylesheet>


  

