import React, { FC, useEffect, useState } from 'react'
import { IDefaultPageProps } from '@Interface/PagesInterface'
import { ITermsAndServicesInterface } from '@Interface/ComponentInterface'
const TermsAndServices: FC<
  IDefaultPageProps & ITermsAndServicesInterface
> = props => {
  const [modal, setmodal] = useState<boolean>(false)
  useEffect(() => {
    setmodal(props.modal)
    if (props.agree) {
      setmodal(false)
    }
  }, [props.modal, props.agree])
  return (
    <div
      className="modal"
      style={{ display: modal ? 'block' : 'none' }}
      id="exampleModalLong"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLongTitle"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-lg" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title header-style" id="exampleModalLongTitle">
              Terms Of Service
            </h5>
          </div>
          <div className="modal-body">
            1 <b>&nbsp; SUBSCRIPTION </b>
            &nbsp;
            <p>
              1.1
              <b>
                &nbsp;<u> License. </u>
              </b>
              During the Term (as defined below) specified on an Order Form
              issued by ZEDEDA or ZEDEDA’s authorized reseller, ZEDEDA grants to
              the Customer identified on the Order Form a non-exclusive,
              non-transferable, non-sublicensable subscription license to use
              the ZEDEDA Service (as defined below) for Customer’s internal
              business purposes, in accordance with the end user or technical
              documentation provided by ZEDEDA to Customer (the “Documentation”)
              for the number of instances under management set forth in the
              Order Form (the “Scope”). “ZEDEDA Service” shall mean: (a) the
              ZEDEDA cloud software known as ZEDCloud as a service solution
              supporting the Edge Virtualization Engine Operating System (“EVE
              OS”), which is licensed to Customer under the ZEDEDA Maintenance
              and Support agreement, as referenced in the Order Form, (b) the
              software solution underlying and contained in the Services; (c)
              any Documentation, and (d) any updates, upgrades, and/or
              modifications of the forgoing which ZEDEDA provides to Customer.
              For the avoidance of doubt, ZEDEDA Service shall at no time
              include the EVE OS.
            </p>
            <p>
              1.2
              <b>
                &nbsp;<u>Restrictions.</u>
              </b>
              Except as expressly authorized in this Agreement, Customer shall
              not, and shall not authorize any third party to: (a) sublicense,
              transfer, loan, distribute, use or duplicate the ZEDEDA Service,
              or any portion thereof, ; (b) use the ZEDEDA Service by, or for
              the benefit of any third party; (c) modify, translate, or prepare
              derivative works based upon the ZEDEDA Service; (d)
              reverse-compile or decompile, disassemble or otherwise reverse
              engineer the ZEDEDA Service, except to the extent expressly
              required to be permitted by applicable law; (e) alter, remove, or
              obscure any copyright, trademark, or other proprietary notices on
              or in the ZEDEDA Service; (f) use the ZEDEDA Service to store or
              transmit infringing, libelous, or otherwise unlawful or tortious
              material, or to store or transmit material in violation of
              third-party privacy or other rights; and/or (g) use the ZEDEDA
              Service to store or transmit viruses, worms, time bombs, Trojan
              horses and other harmful or malicious code, files, scripts, agents
              or programs. Customer shall make any disclosures and obtain any
              consents as required by any applicable law, rule or regulation for
              the use, processing, transfer, disclosure, or access to Customer
              data by the ZEDEDA Service. Except for the license expressly
              granted by ZEDEDA to Customer under this Agreement, ZEDEDA and its
              licensors reserve all right, title and interests in and to the
              ZEDEDA Service and any derivative works derived therefrom, and all
              intellectual property rights therein.
            </p>
            <p>
              1.3
              <b>
                &nbsp;<u>User Accounts.</u>
              </b>
              Customer is responsible for maintaining and updating its account
              information to ensure it is accurate and complete. Customer is
              responsible for all activities conducted under its user logins and
              for its users’ compliance with this Agreement, and with all
              applicable laws and regulations. Unauthorized use, resale or
              commercial exploitation of the ZEDEDA Services in any way is
              expressly prohibited. Customer will be liable for any breach of
              this Agreement by any of its users. In addition to its other
              remedies hereunder, ZEDEDA reserves the right upon notice to
              Customer to terminate any user’s right to access the ZEDEDA
              Service if such user has violated any of the restrictions
              contained in this Agreement.
            </p>
            <p>
              2 <b> &nbsp;PROFESSIONAL Services.</b> If the parties agree ZEDEDA
              will provide professional services related to the ZEDEDA Service,
              including without limitation, training or implementation services
              (“Professional Services”) as set forth on an Order Form, ZEDEDA
              will provide those Professional Services in accordance with a
              statement of work to be agreed between the Parties for such
              Professional Services (“SOW”). ZEDEDA may need to rely on Customer
              for access to certain customer hardware, software, systems, data
              and personnel to provide the Professional Services. ZEDEDA’s
              responsibility to provide the Professional Services will be
              adjusted equitably to reflect Customer’s actions or inactions or
              changes to Customer’s systems.
            </p>
            <p>
              3 <b> &nbsp; SUPPORT.</b> Subject to Customer’s payment of the
              applicable subscription Fees as set forth in the Order Form,
              ZEDEDA shall provide Support for the ZEDEDA Service as set forth
              in Exhibit A during the Term.
            </p>
            <p>
              4 <b> &nbsp;PAYMENT. </b>In consideration for the subscription to
              the ZEDEDA Service or the delivery of any Professional Services,
              Customer shall pay to ZEDEDA the Fees in the amounts and at the
              times specified on the Order Form or in an SOW. All Fees are
              payable in USD only. Excluding taxes based on ZEDEDA’s income,
              Customer is liable for all taxes, duties and customs fees
              associated with the Fees, whether or not ZEDEDA invoices Customer
              for them. Past due accounts shall be charged interest on a monthly
              basis, calculated at one and one-half percent (1.5%) per month of
              the unpaid balance or the maximum rate allowable by law. At the
              end of each calendar quarter during the Term, ZEDEDA may invoice
              Customer for any additional Devices which are more than five
              percent (5%) above the quantity for which Customer has paid Fees,
              prorated for the remainder of the Initial Term or then-current
              Renewal Term. Except as otherwise expressly provided in this
              Agreement, Customer shall not be entitled to any refund of any
              Fees paid for the ZEDEDA Service if Customer fails to use full
              Scope of the license during the applicable License Term.
            </p>
            <p>
              5<b> &nbsp;TERM AND TERMINATION</b>
            </p>
            <p>
              5.1
              <b>
                &nbsp;<u>Term.</u>
              </b>
              This Agreement shall commence on the Effective Date and shall
              continue for the Initial Term set forth on the Order Form. At the
              end of the Initial Term, this Agreement will automatically renew
              for additional twelve (12) month terms (each, a “Renewal Term”)
              unless either party provides notice to the other at least sixty
              (60) days before the end of the Initial Term or then-current
              Renewal Term. Except as provided in an Order Form, the fees for
              any Renewal Term will be at ZEDEDA’s then-current rate. The
              Initial Term and any Renewal Terms are collectively the “Term”.
            </p>
            <p>
              5.2
              <b>
                &nbsp;<u>Termination.</u>
              </b>
              This Agreement may be terminated by either party: (a) upon thirty
              (30) days written notice if the other party materially breaches
              any provision of this Agreement and the breach remains uncured
              within that thirty (30) day period; or (b) effective immediately,
              if the other party ceases to do business, otherwise terminates its
              business operations, becomes insolvent or seeks protection under
              any bankruptcy, receivership, trust deed, or comparable
              proceeding, or if any proceeding is filed against it (and not
              dismissed within ninety (90) days); or (c) effective immediately,
              upon any breach of Section 1.1 or Section 7.5 of this Agreement.
            </p>
            <p>
              5.3
              <b>
                &nbsp;<u>Effect of Termination.</u>
              </b>
              Upon any expiration or termination of this Agreement: (a) all
              licenses and rights granted by ZEDEDA to Customer hereunder shall
              terminate; (b) Customer will cease all use of the ZEDEDA Service;
              (c) Customer shall immediately return to ZEDEDA or destroy all
              duplicates, and any ZEDEDA Confidential Information in its
              possession or control; and (d) Customer shall pay to ZEDEDA within
              thirty (30) days of the date of termination any fees accrued prior
              to the date of termination and, if this Agreement is terminated
              for any reason other than ZEDEDA’s uncured breach, any fees that
              would have been payable for the remainder of the Initial Term or
              then-current Renewal Term. With respect to Professional Services
              only: except in the event of termination for Customer’s uncured
              breach, Customer shall be entitled to a refund for any prepaid and
              unused Fees for Professional Services only.
            </p>
            <p>
              5.4
              <b>
                &nbsp;<u>Survival.</u>
              </b>
              The provisions of Sections 1.1, 4, 5, 6, 7.4, 7.5, 8 and 9 shall
              survive and remain effective after the effective date of
              termination or expiration of this Agreement.
            </p>
            <p>
              6<b> &nbsp;INDEMNIFICATION.</b> ZEDEDA, at its own expense
              (including payment of reasonable attorneys’ fees, expert fees and
              court costs), shall defend Customer from any and all third party
              claims that the ZEDEDA Service infringes any patent or copyright
              or misappropriates any third party’s trade secret and shall
              indemnify Customer from any amounts assessed against Customer in a
              resulting judgment or amounts to settle a claims, provided that
              Customer: (a) gives ZEDEDA prompt written notice of any claim; (b)
              permits ZEDEDA to solely control and direct the defense or
              settlement of any claim; and (c) provides ZEDEDA all reasonable
              assistance in connection with the defense or settlement of any
              claim. If Customer’s use of the ZEDEDA Service is (or in ZEDEDA’s
              opinion is likely to be) enjoined, ZEDEDA, at its expense and in
              its sole discretion, may: (a) procure the right to allow Customer
              to continue to use the ZEDEDA Service, or (b) modify or replace
              the ZEDEDA Service to become non-infringing, or (c) terminate
              Customer’s right to use the affected portion of the ZEDEDA Service
              and refund any pre-paid, unused Fees paid therefor. ZEDEDA shall
              have no obligations under this Section to the extent any
              infringement claim is based upon or arising out of: (u) ZEDEDA’s
              compliance with Customer’s custom requirements or specifications
              if and to the extent such compliance resulted in the infringement,
              (v) any claim to the extent relating to any third party products
              or Customer’s data, (w) any modification or alteration to the
              ZEDEDA Service not made by or on behalf of ZEDEDA; (x) any
              combination or use of the ZEDEDA Service with products or services
              not approved by ZEDEDA in writing; (y) Customer’s continuance of
              allegedly infringing activity after being notified thereof by
              ZEDEDA in writing; and/or (z) use of the ZEDEDA Service not in
              accordance with the terms of this Agreement or in violation of
              applicable law. The remedies set forth in this Section constitute
              Customer’s sole and exclusive remedies, and ZEDEDA’s entire
              liability, with respect to infringement or misappropriation of
              third-party intellectual property.
            </p>
            <p>
              7
              <b>
                &nbsp;WARRANTY; SUPPORT; DISCLAIMER; LIMITATION OF LIABILITY.
              </b>
            </p>
            <p>
              <b>
                &nbsp;<u>ZEDEDA Service Warranty.</u>
              </b>
              ZEDEDA warrants to Customer that, during the Term the ZEDEDA
              Service will materially perform in accord with the Documentation
              at the Service Level Availability attached as Exhibit A hereto
              (the “SLA”). ZEDEDA’s entire liability and Customer’s sole and
              exclusive remedy for any breach of the preceding warranty will be
              for ZEDEDA to provide the Service Credits as set forth in the SLA,
              or if in ZEDEDA’s judgment, ZEDEDA will be unable to meet the
              Service Level Availability, to refund the Fees paid for any period
              during which the ZEDEDA Service are non-conforming and any
              pre-paid, unused Fees and to terminate this Agreement. The
              warranties in this Section 7.1 do not cover non-conformances due
              to: (x) any modification, reconfiguration or maintenance of the
              ZEDEDA Service performed by anyone other than ZEDEDA; (y) any use
              of the ZEDEDA Service on a system that does not meet ZEDEDA’s
              minimum standards; or (z) any software or hardware not provided by
              ZEDEDA. ZEDEDA shall be responsible under this Section 7.1 only if
              Customer provides ZEDEDA with a written warranty claim detailing
              the non-conformance in the ZEDEDA Service within thirty (30) days
              of the non-conformance.
            </p>
            <p>
              7.2 &nbsp; ZEDEDA further warrants to Customer that, during the
              Term (i) ZEDEDA will perform best efforts consistent with
              industry-standards to ensure that the ZEDEDA Services will be free
              of viruses, malware, worms, time bombs, Trojan Horses, software
              locks, phone-home mechanisms, backdoors, trapdoors, contaminants,
              and other harmful or malicious code that may harm the Customer’s
              computer systems or network and (ii) ZEDEDA and the Services are
              in compliance with all terms of any Open Source License (as
              defined below) applicable to any portion of the ZEDEDA Services,
              including all terms related to notice, attribution, and access to
              source code.
            </p>
            <p>
              7.3
              <b>
                &nbsp;<u>Professional Services Warranty.</u>
              </b>
              ZEDEDA represents and warrants to Customer that all Professional
              Services provided hereunder shall be performed in a manner
              conforming to generally accepted industry standards and practices
              for similar services. ZEDEDA’s entire liability and Customer’s
              sole and exclusive remedy for any breach of the preceding warranty
              will be for ZEDEDA to re-perform the nonconforming Professional
              Services, provided that ZEDEDA must have received written notice
              of the nonconformity from Customer no later than thirty (30) days
              after the original performance of the services by ZEDEDA.
            </p>
            <p>
              7.4
              <b>
                &nbsp; ZEDEDA DOES NOT REPRESENT OR WARRANT THAT THE ZEDEDA
                SERVICES WILL BE UNINTERRUPTED OR ERROR-FREE, OR THAT THE ZEDEDA
                SERVICES WILL MEET CUSTOMER’S REQUIREMENTS OR THAT ALL ERRORS IN
                THE ZEDEDA SERVICES WILL BE CORRECTED OR THAT THE OVERALL SYSTEM
                THAT MAKES THE ZEDEDA SERVICES AVAILABLE (INCLUDING BUT NOT
                LIMITED TO THE INTERNET, OTHER TRANSMISSION NETWORKS, AND
                CUSTOMER’S LOCAL NETWORK AND EQUIPMENT) WILL BE FREE OF VIRUSES
                OR OTHER HARMFUL COMPONENTS. THE WARRANTIES STATED HEREIN ARE
                THE SOLE AND EXCLUSIVE WARRANTIES OFFERED BY ZEDEDA. THERE ARE
                NO OTHER WARRANTIES OR CONDITIONS, EXPRESS OR IMPLIED, INCLUDING
                WITHOUT LIMITATION, THOSE OF MERCHANTABILITY, FITNESS FOR A
                PARTICULAR PURPOSE OR NON-INFRINGEMENT OF THIRD PARTY RIGHTS.
                CUSTOMER ASSUMES ALL RESPONSIBILITY FOR DETERMINING WHETHER THE
                SERVICES ARE ACCURATE, RELIABLE OR SUFFICIENT FOR ITS PURPOSES.
              </b>
            </p>
            <p>
              7.5
              <b>
                &nbsp; Except for a breach by either party of its obligations
                under sections 1.1 or 8 of this Agreement, (a) in no event shall
                either party be liable for consequential, exemplary, punitive,
                incidental, indirect or special damages or costs, including lost
                profits or costs of procurement of substitute goods, whether or
                not the party has been advised of the possibility of those
                damages or costs; and (b) in no event will the aggregate
                liability of either party, or any of ZEDEDA’s third party
                licensors under this Agreement (under any theory of liability)
                exceed the Fees received by ZEDEDA from Customer (and in the
                case of Customer’s liability, Fees paid and due to ZEDEDA) in
                the twelve (12) month period prior to the claim, whether any
                remedy set forth herein fails of its essential purpose or
                otherwise.
              </b>
            </p>
            <p>
              8<b> &nbsp;Confidential information:</b> “Confidential
              Information” means any non-public data, information and other
              materials regarding the products, services or business of a party
              (and if either party is bound to protect the confidentiality of
              any third party’s information, of that third party) provided to
              the other party. Without limiting the foregoing, the ZEDEDA
              Service, any performance data, benchmark results, and technical
              information relating thereto, the Documentation, ZEDEDA’s pricing
              information and the terms and conditions of this Agreement (but
              not its existence) are the Confidential Information of ZEDEDA.
              Confidential Information shall not include information which: (a)
              is already known to the Receiving Party without restriction prior
              to disclosure by the Disclosing Party; (b) becomes publicly
              available without fault of the Receiving Party; (c) is rightfully
              obtained by the Receiving Party from a third party without
              restriction as to disclosure, or is approved for release by
              written authorization of the Disclosing Party; or (d) is required
              to be disclosed by law or governmental regulation, provided that
              the Receiving Party provides reasonable notice to Disclosing Party
              of the required disclosure and reasonably cooperates with the
              Disclosing Party in limiting the disclosure.
            </p>
            <p>
              8.2
              <b>
                &nbsp;<u>Disclosure and Use.</u>
              </b>
              Each party (the “Receiving Party”) agrees to keep the Confidential
              Information of the other party (the “Disclosing Party”) in
              confidence and not to use the Confidential Information except in
              performing hereunder. Except as expressly authorized herein, the
              Receiving Party agrees to: (a) treat all Confidential Information
              of the Disclosing Party in the same manner as it treats its own
              similar proprietary information, but in no case with less than
              reasonable care; and (b) disclose the Disclosing Party’s
              Confidential Information only to those employees and contractors
              of the Receiving Party who have a need to know the information for
              the purposes of this Agreement, provided that any employee and
              contractor shall be subject to a binding written agreement with
              respect to Confidential Information at least as restrictive as the
              terms of this Agreement. The Receiving Party shall indemnify and
              hold the Disclosing Party harmless for any non-compliance of the
              Receiving Party’s employee or contractor with the terms of this
              Agreement. Subject to an appropriate obligation of
              confidentiality, ZEDEDA may disclose the terms of this Agreement
              and any other ordering or purchasing documents between the parties
              related to this Agreement to its third-party licensors for the
              purpose of ZEDEDA’s compliance with the terms of the license
              agreements with those third-party licensors.
            </p>
            <p>
              9<b> GENERAL: </b>
            </p>
            <p>
              9.1
              <b>
                &nbsp;<u>Security.</u>
              </b>
              During the Agreement Term, ZEDEDA will maintain a security program
              that materially complies with generally accepted industry
              standards. ZEDEDA will maintain the physical and technical
              safeguards further described in ZEDEDA’s SOC 2 Type II report as
              updated from time to time, available from ZEDEDA upon request,
              subject to appropriate confidentiality terms and conditions.
            </p>
            <p>
              9.2
              <b>
                &nbsp;<u> Ownership.</u>
              </b>
              Customer acknowledges and agrees that as between ZEDEDA and
              Customer, all right, title and interest in and to the ZEDEDA
              Services and all enhancements, modifications and derivatives
              thereof (including any and all patents, copyrights, trade secret
              rights, trademarks, trade names and other proprietary rights
              embodied therein or associated therewith) are and shall remain
              with ZEDEDA or its licensors, and ZEDEDA in no way conveys any
              right or interest in the ZEDEDA Services other than a limited
              license to use, as set forth in this Agreement. ZEDEDA also
              retains ownership of all right, title and interest in and to all
              know-how related to the ZEDEDA Services. All rights to the ZEDEDA
              Services not expressly granted to Customer under this Agreement
              are reserved by ZEDEDA. ZEDEDA also retains ownership of any
              information, data, technology and materials other than the ZEDEDA
              Services (or the software contained in the ZEDEDA Services) that
              ZEDEDA makes available in connection with the ZEDEDA Services,
              including any Service documentation, sample code, software
              libraries and other related technology and materials.
            </p>
            <p>
              9.3
              <b>
                &nbsp;<u>Reporting. </u>
              </b>
              Customer acknowledges that the ZEDEDA Service may contain
              automated reporting routines that will automatically identify and
              analyze certain aspects of use and performance of the ZEDEDA
              Service and/or the systems on which they are installed, as well as
              the operator and operating environment (including problems and
              issues that arise in connection therewith), and provide e-mail and
              other reports to ZEDEDA. ZEDEDA will be free to use for
              development, diagnostic and corrective purposes any data and
              information it so collects relating to diagnosis, problems,
              systems, performance, use or functionality.
            </p>
            <p>
              9.4
              <b>
                &nbsp;<u>Compliance with Laws; Export Control.</u>
              </b>
              Customer shall use the ZEDEDA Service \in compliance with all
              applicable laws, statutes, rules and regulations. Customer will
              not export, re-export, use, or divert the ZEDEDA Services to or on
              behalf of (a) any country that is subject to U.S., EU or UN
              economic sanctions administered by the US Department of the
              Treasury’s Office of Foreign Assets Control (“OFAC”), the European
              Commission or the UN, including but not limited to Burma, Cuba,
              Iran, the Crimea region of Ukraine, Sudan, Syria and North Korea;
              (b) the government of any country sanctioned by any of the above,
              wherever located; or (c) persons or entities identified as
              “Specially Designated Nationals” by OFAC or sanctioned pursuant to
              applicable EU Regulation, or persons or entities that are owned or
              controlled by such person or entity. Customer shall not distribute
              or supply the ZEDEDA Services to any person if it has reason to
              believe that such person intends to export, re-export or otherwise
              transfer the ZEDEDA Services to, or use the ZEDEDA Services in or
              for the benefit of, any such OFAC- or EU sanctioned countries,
              governments, persons, or entities. Customer shall not use the
              ZEDEDA Services in connection with the commission of terrorist
              acts or the design, development, production, or use of nuclear,
              biological, or chemical weapons; missiles; or unmanned aerial
              vehicles. You shall not export, re-export, or transfer the ZEDEDA
              Services to any person or entity with knowledge or reason to know
              that any of the prohibited activities identified in this section
              are intended by such person or entity. Without limiting the
              foregoing, Customer shall not commit any act which would, directly
              or indirectly, violate, or which may cause ZEDEDA to violate, any
              United States, EU or local law, regulation, treaty or agreement
              relating to the export or re-export of the ZEDEDA Services. At
              Customer’s expense, Customer shall obtain any government consents,
              authorizations, or licenses required for Customer to exercise its
              rights and to discharge its obligations under this Agreement.
              Customer acknowledges that its data, once placed on the ZEDEDA
              Services may constitute an export of its data by the Customer to
              one or more foreign jurisdictions. Customer shall not cause any
              such export of data in violation of the laws of the United States
              and/or such other foreign jurisdictions.
            </p>
            <p>
              9.5
              <b>
                &nbsp;<u>Open Source Code.</u>
              </b>
              Components of the ZEDEDA Service and the ZEDEDA Cloud may be
              covered by so-called “open source” software licenses (“Open Source
              Software”). Customer’s use of any Open Source Software is subject
              to and governed by the applicable license accompanying, linked to
              or embedded in that Open Source Software (each an “Open Source
              License”). ZEDEDA grants Customer a license to use the Open Source
              Software to the full extent permitted by the applicable Open
              Source License.
            </p>
            <p>
              9.6
              <b>
                &nbsp;<u>Notice.</u>
              </b>
              Any and all notices or other information to be given by one of the
              parties to the other shall be deemed sufficiently given when
              forwarded by certified mail (receipt requested), overnight
              delivery or hand delivery to the other party to the address set
              forth on the Order Form. Notices shall be deemed to have been
              received on the first business day following the day of overnight
              transmission or hand delivery or on the fifth business day
              following the day of forwarding by certified mail. The address of
              either party may be changed at any time by giving ten (10)
              business days prior written notice to the other party in
              accordance with the foregoing.
            </p>
            <p>
              9.7
              <b>
                &nbsp;<u>Relationship of the Parties.</u>
              </b>
              Neither the making of this Agreement nor the performance of its
              provisions shall be construed to constitute either of the parties
              hereto an agent, employee, partner, joint venturer, or legal
              representative of the other.
            </p>
            <p>
              9.8
              <b>
                &nbsp;<u>U.S. Government End-Purchaser. </u>
              </b>
              As defined in FAR section 2.101, DFAR section 252.227-7014(a)(1)
              and DFAR section 252.227-7014(a)(5) or otherwise, all ZEDEDA
              Service and accompanying documentation provided by ZEDEDA are
              “commercial items,” “commercial computer software” and/or
              “commercial computer software documentation.” Consistent with DFAR
              section 227.7202 and FAR section 12.212, any use, modification,
              reproduction, release, performance, display, disclosure or
              distribution thereof by or for the U.S. Government shall be
              governed solely by these terms and shall be prohibited except to
              the extent expressly permitted by these terms.
            </p>
            <p>
              9.9
              <b>
                &nbsp;<u>Severability; Waiver.</u>
              </b>
              Should any term of this Agreement be declared void or
              unenforceable that provision shall modified r eliminated to the
              minimum extent necessary and the declaration shall have no effect
              on the remaining terms hereof, which shall continue in full force
              and effect. The failure of either party to enforce any rights
              granted hereunder or to take action against the other party in the
              event of any breach hereunder shall not be deemed a waiver by that
              party as to future breaches.
            </p>
            <p>
              9.10
              <b>
                &nbsp;<u> Assignment.</u>
              </b>
              Neither this Agreement, nor any rights, licenses or obligations
              hereunder, may be assigned by Customer without the prior written
              consent of ZEDEDA. Any attempted assignment in violation of this
              Agreement shall be void and without effect.
            </p>
            <p>
              9.11
              <b>
                &nbsp;<u> Governing Law; Venue.</u>
              </b>
              This Agreement shall be governed by and construed in accordance
              with the laws of the United States and the State of California,
              excluding rules governing conflict of law and choice of law. The
              federal and state courts within Santa Clara County, California
              shall have exclusive jurisdiction to adjudicate any dispute
              arising out of this Agreement. Each party hereto expressly
              consents to the personal jurisdiction of, and venue in, those
              courts and service of process being affected upon it by registered
              mail and sent to the address set forth at the beginning of this
              Agreement. The parties agree that the UN Convention on Contracts
              for the International Sale of Goods (Vienna, 1980) and the Uniform
              Computer Information Transaction Act or similar federal or state
              laws or regulations shall not apply to this Agreement nor to any
              dispute or transaction arising out of this Agreement. The party
              prevailing in any dispute under this Agreement shall be entitled
              to its costs and legal fees.
            </p>
            <p>
              9.12
              <b>
                &nbsp;<u> Entire Agreement.</u>
              </b>
              This Agreement and the Exhibits attached hereto sets forth the
              entire agreement of the parties with respect to the subject matter
              contained herein, and no oral or written statement or
              representations not contained in this Agreement shall have any
              force or effect. This Agreement may be amended only upon the
              written consent of both parties.
            </p>
            <p>
              <b>
                The Parties acknowledge that they are bound by this ZEDEDA End
                User License Agreement as of the Effective Date.
              </b>
            </p>
          </div>
          <div className="modal-footer justify-content-center">
            <button
              type="button"
              className="btn agree-btn"
              onClick={props.handleAgree}
            >
              Agree
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TermsAndServices
